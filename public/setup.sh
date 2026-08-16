#!/usr/bin/env bash
#
# llms-setup — pick which LLM providers to enable and store their API keys.
# Installed by llmspy.org/install.sh as ~/.llms/bin/llms-setup, also reachable
# as `llms setup`.
#
#   --list     print provider status and exit (no TUI)
#   --home DIR config directory (default ~/.llms)
#
# Reads the provider catalogue out of the Docker image's providers.json so it
# always matches the version you have installed. Written for bash 3.2+.

set -u

LLMS_HOME="${LLMS_HOME:-$HOME/.llms}"
LIST_ONLY=0

while [ $# -gt 0 ]; do
    case "$1" in
        --list)   LIST_ONLY=1; shift ;;
        --home)   LLMS_HOME="$2"; shift 2 ;;
        --home=*) LLMS_HOME="${1#*=}"; shift ;;
        -h|--help) sed -n '2,12p' "$0" | sed 's/^# \{0,1\}//'; exit 0 ;;
        *) echo "llms-setup: unknown option '$1'" >&2; exit 2 ;;
    esac
done

[ -f "$LLMS_HOME/config" ] && . "$LLMS_HOME/config"
LLMS_IMAGE="${LLMS_IMAGE:-ghcr.io/servicestack/llms:latest}"
LLMS_DOCKER_USER_ARGS="${LLMS_DOCKER_USER_ARGS:-}"
LLMS_PORT="${LLMS_PORT:-8000}"

ENV_FILE="$LLMS_HOME/.env"

# ----------------------------------------------------------------- colors ---

if [ -z "${NO_COLOR:-}" ]; then
    B=$'\033[1m'; DIM=$'\033[2m'; RED=$'\033[31m'; GRN=$'\033[32m'
    YEL=$'\033[33m'; BLU=$'\033[34m'; CYA=$'\033[36m'; REV=$'\033[7m'; N=$'\033[0m'
else
    B=""; DIM=""; RED=""; GRN=""; YEL=""; BLU=""; CYA=""; REV=""; N=""
fi

die() { printf '\n%serror:%s %s\n' "$RED$B" "$N" "$*" >&2; exit 1; }

command -v docker >/dev/null 2>&1 || die "docker not found on PATH"
docker info >/dev/null 2>&1 || die "the Docker daemon is not running"
[ -d "$LLMS_HOME" ] || die "$LLMS_HOME does not exist — run the installer first"

# ------------------------------------------------- load provider catalogue ---

# One provider per line, fields separated by US (0x1f) so empty fields survive `read`:
#   id | name | ENV1,ENV2 | docs-url | enabled | is-local | model-count | api
load_catalogue() {
    # shellcheck disable=SC2086
    docker run --rm -i $LLMS_DOCKER_USER_ARGS \
        -v "$LLMS_HOME:/home/llms/.llms:ro" \
        --entrypoint python "$LLMS_IMAGE" - <<'PYEOF'
import json, os, sys

HOME = "/home/llms/.llms"

def load(name):
    try:
        with open(os.path.join(HOME, name), encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return {}

catalogue = load("providers.json")
extra     = load("providers-extra.json")
config    = load("llms.json")
configured = config.get("providers", {}) if isinstance(config, dict) else {}

def n_models(d):
    m = d.get("models")
    if isinstance(m, (dict, list)):
        return len(m)
    return 0

merged = {}
for src in (catalogue, extra):
    if not isinstance(src, dict):
        continue
    for pid, defn in src.items():
        if not isinstance(defn, dict):
            continue
        row = merged.setdefault(pid, {})
        for k, v in defn.items():
            if k != "models":
                row[k] = v
        row["models"] = max(row.get("models", 0), n_models(defn))

rows = []
for pid in set(list(merged.keys()) + list(configured.keys())):
    defn = merged.get(pid, {})
    over = configured.get(pid) if isinstance(configured.get(pid), dict) else {}

    envs = over.get("env") or defn.get("env") or []
    api_key = over.get("api_key") or defn.get("api_key") or ""
    if isinstance(api_key, str) and api_key.startswith("$") and api_key[1:] not in envs:
        envs = list(envs) + [api_key[1:]]

    api = over.get("api") or defn.get("api") or ""
    is_local = 1 if any(h in api for h in ("localhost", "127.0.0.1", "0.0.0.0", "host.docker.internal")) else 0

    enabled = 1 if (pid in configured and over.get("enabled", True)) else 0
    models = max(defn.get("models", 0), n_models(over))
    name = defn.get("name") or over.get("name") or pid

    rows.append((pid, name, ",".join(envs), defn.get("doc") or "", str(enabled),
                 str(is_local), str(models), api))

rows.sort(key=lambda r: (r[1] or r[0]).lower())
out = []
for r in rows:
    out.append("\x1f".join((x or "").replace("\x1f", " ").replace("\n", " ") for x in r))
sys.stdout.write("\n".join(out) + "\n")
PYEOF
}

[ -t 2 ] && printf '%sReading provider catalogue...%s' "$DIM" "$N" >&2
CATALOGUE="$(load_catalogue 2>/dev/null)"
[ -t 2 ] && printf '\r\033[K' >&2
[ -n "$CATALOGUE" ] || die "could not read providers.json from $LLMS_IMAGE"

# ------------------------------------------------------------ build state ---

P_ID=(); P_NAME=(); P_ENVS=(); P_DOC=(); P_LOCAL=(); P_MODELS=()
S_ON=(); S_VAR=(); S_VAL=(); S_SRC=()

# Existing saved keys
saved_value() {
    # saved_value VAR -> prints value from .env, or nothing
    [ -f "$ENV_FILE" ] || return 0
    local line
    while IFS= read -r line || [ -n "$line" ]; do
        case "$line" in
            "$1"=*) printf '%s' "${line#*=}"; return 0 ;;
        esac
    done < "$ENV_FILE"
}

# Env vars that commonly exist for unrelated reasons — offered, never assumed.
GENERIC_ENV_VARS="GITHUB_TOKEN"

COUNT=0
DETECTED=0
while IFS=$'\037' read -r pid name envs doc enabled islocal models api; do
    [ -n "$pid" ] || continue
    P_ID[$COUNT]="$pid"
    P_NAME[$COUNT]="$name"
    P_ENVS[$COUNT]="$envs"
    P_DOC[$COUNT]="$doc"
    P_LOCAL[$COUNT]="$islocal"
    P_MODELS[$COUNT]="$models"

    # Resolve which env var holds (or would hold) this provider's key
    var=""; val=""; src="none"
    oldifs="$IFS"; IFS=','
    for e in $envs; do
        case "$e" in ''|[!A-Za-z_]*|*[!A-Za-z0-9_]*) continue ;; esac
        [ -z "$var" ] && var="$e"
        v="$(saved_value "$e")"
        if [ -n "$v" ]; then var="$e"; val="$v"; src="saved"; break; fi
    done
    if [ -z "$val" ]; then
        for e in $envs; do
            case "$e" in ''|[!A-Za-z_]*|*[!A-Za-z0-9_]*) continue ;; esac
            eval "v=\${$e:-}"
            if [ -n "$v" ]; then var="$e"; val="$v"; src="shell"; break; fi
        done
    fi
    IFS="$oldifs"

    S_VAR[$COUNT]="$var"
    S_VAL[$COUNT]="$val"
    S_SRC[$COUNT]="$src"

    # Pre-select: anything already saved in .env, plus keys found in the shell —
    # except shared-purpose tokens like GITHUB_TOKEN, which is usually the gh CLI's
    # and not a Copilot subscription, so it gets offered rather than assumed.
    if [ "$islocal" = "1" ]; then
        S_ON[$COUNT]="$enabled"
    elif [ "$src" = "saved" ]; then
        S_ON[$COUNT]=1
    elif [ "$src" = "shell" ]; then
        case " $GENERIC_ENV_VARS " in
            *" $var "*) S_ON[$COUNT]=0 ;;
            *)          S_ON[$COUNT]=1; DETECTED=$((DETECTED+1)) ;;
        esac
    else
        S_ON[$COUNT]=0
    fi
    COUNT=$((COUNT+1))
done <<EOF
$CATALOGUE
EOF

[ "$COUNT" -gt 0 ] || die "no providers found in the catalogue"

# Every env var name the catalogue knows about. Anything else in .env was put
# there by the user (e.g. DOTNET_SYSTEM_GLOBALIZATION_INVARIANT=1) and must
# survive a save.
ALL_PROVIDER_VARS=""
i=0
while [ "$i" -lt "$COUNT" ]; do
    oldifs="$IFS"; IFS=','
    for e in ${P_ENVS[$i]}; do
        [ -n "$e" ] || continue
        case " $ALL_PROVIDER_VARS " in *" $e "*) ;; *) ALL_PROVIDER_VARS="$ALL_PROVIDER_VARS $e" ;; esac
    done
    IFS="$oldifs"
    i=$((i+1))
done

# Lines in .env that aren't provider API keys — preserved verbatim on save.
custom_env_lines() {
    [ -f "$ENV_FILE" ] || return 0
    local line var
    while IFS= read -r line || [ -n "$line" ]; do
        case "$line" in
            ''|\#*) continue ;;
            *=*)    var="${line%%=*}" ;;
            *)      continue ;;
        esac
        case " $ALL_PROVIDER_VARS " in
            *" $var "*) ;;
            *) printf '%s\n' "$line" ;;
        esac
    done < "$ENV_FILE"
}

mask() {
    local v="$1" n=${#1}
    if [ "$n" -eq 0 ]; then printf -- '-'
    elif [ "$n" -le 10 ]; then printf '%s' "********"
    else printf '%s..%s' "${v:0:4}" "${v: -4}"
    fi
}

status_of() {
    local i="$1"
    if [ "${P_LOCAL[$i]}" = "1" ]; then printf 'local'
    else printf '%s' "${S_SRC[$i]}"; fi
}

# ------------------------------------------------------------- list mode ----

if [ "$LIST_ONLY" -eq 1 ]; then
    printf '%s%-3s %-22s %-26s %-8s %-16s %s%s\n' "$B" "on" "provider" "api key env var" "source" "key" "models" "$N"
    i=0
    while [ "$i" -lt "$COUNT" ]; do
        m="[ ]"; [ "${S_ON[$i]}" = "1" ] && m="[x]"
        printf '%-3s %-22s %-26s %-8s %-16s %s\n' \
            "$m" "${P_NAME[$i]}" "${S_VAR[$i]:--}" "$(status_of "$i")" "$(mask "${S_VAL[$i]}")" "${P_MODELS[$i]}"
        i=$((i+1))
    done
    exit 0
fi

# ------------------------------------------------------------------ TUI -----

TTY=/dev/tty
[ -r "$TTY" ] && [ -w "$TTY" ] || die "no terminal available — try: llms setup --list"

OLD_STTY="$(stty -g < "$TTY" 2>/dev/null)"
restore_tty() {
    [ -n "${OLD_STTY:-}" ] && stty "$OLD_STTY" < "$TTY" 2>/dev/null
    printf '\033[?25h\033[?1049l' > "$TTY" 2>/dev/null
}
trap 'restore_tty; exit 130' INT TERM
trap 'restore_tty' EXIT

stty -echo -icanon min 1 time 0 < "$TTY" 2>/dev/null
printf '\033[?1049h\033[?25l' > "$TTY"

CUR=0
TOP=0
MSG=""
if [ "$DETECTED" -gt 0 ]; then
    MSG="${YEL}$DETECTED API key(s) found in your shell and pre-selected${N} ${DIM}— press n to clear${N}"
fi

term_rows() { local s; s="$(stty size < "$TTY" 2>/dev/null)"; printf '%s' "${s%% *}"; }
term_cols() { local s; s="$(stty size < "$TTY" 2>/dev/null)"; printf '%s' "${s##* }"; }

draw() {
    local rows cols vis i line marker name var st key mdl
    rows="$(term_rows)"; [ -n "$rows" ] || rows=24
    cols="$(term_cols)"; [ -n "$cols" ] || cols=80
    vis=$((rows - 9))
    [ "$vis" -lt 3 ] && vis=3
    [ "$vis" -gt "$COUNT" ] && vis="$COUNT"

    [ "$CUR" -lt "$TOP" ] && TOP="$CUR"
    [ "$CUR" -ge $((TOP + vis)) ] && TOP=$((CUR - vis + 1))
    [ "$TOP" -lt 0 ] && TOP=0

    {
    printf '\033[H'
    printf '\033[K %sllms.py — providers%s\n' "$B$CYA" "$N"
    printf '\033[K %s%s%s\n' "$DIM" "Enabled providers and the API keys they use. Keys are saved to $ENV_FILE" "$N"
    printf '\033[K\n'

    i="$TOP"
    while [ "$i" -lt $((TOP + vis)) ] && [ "$i" -lt "$COUNT" ]; do
        if [ "${S_ON[$i]}" = "1" ]; then marker="${GRN}●${N}"; else marker="${DIM}○${N}"; fi
        name="${P_NAME[$i]}"
        var="${S_VAR[$i]:--}"
        st="$(status_of "$i")"
        key="$(mask "${S_VAL[$i]}")"
        mdl="${P_MODELS[$i]}"
        case "$st" in
            saved) st="${GRN}saved${N}" ;;
            shell) st="${YEL}shell${N}" ;;
            local) st="${BLU}local${N}" ;;
            *)     st="${DIM}-    ${N}" ;;
        esac
        line="$(printf ' %b  %-20.20s %-26.26s %b  %-14.14s %4s' \
                "$marker" "$name" "$var" "$st" "$key" "$mdl")"
        if [ "$i" -eq "$CUR" ]; then
            printf '\033[K%s%s%s\n' "$REV" "$line" "$N"
        else
            printf '\033[K%s\n' "$line"
        fi
        i=$((i+1))
    done

    printf '\033[K\n'
    if [ "$COUNT" -gt "$vis" ]; then
        printf '\033[K %s%d–%d of %d%s\n' "$DIM" $((TOP+1)) $((TOP+vis)) "$COUNT" "$N"
    else
        printf '\033[K\n'
    fi

    if [ -n "${P_DOC[$CUR]}" ]; then
        printf '\033[K %s%s%s\n' "$DIM" "${P_DOC[$CUR]}" "$N"
    else
        printf '\033[K\n'
    fi

    if [ -n "$MSG" ]; then
        printf '\033[K %s\n' "$MSG"
    else
        printf '\033[K\n'
    fi

    printf '\033[K %s↑↓%s move  %sspace%s toggle  %senter%s set key  %sx%s clear  %sa%s all  %sn%s none  %ss%s save  %sq%s quit\n' \
        "$B" "$N" "$B" "$N" "$B" "$N" "$B" "$N" "$B" "$N" "$B" "$N" "$B" "$N" "$B" "$N"
    printf '\033[J'
    } > "$TTY"
}

prompt_key() {
    local i="$1" var val
    var="${S_VAR[$i]}"
    if [ -z "$var" ]; then
        MSG="${YEL}${P_NAME[$i]} has no API key env var — nothing to enter${N}"
        return
    fi
    stty "$OLD_STTY" < "$TTY" 2>/dev/null
    printf '\033[?25h' > "$TTY"
    {
        printf '\n\n %s%s%s\n' "$B" "${P_NAME[$i]}" "$N"
        [ -n "${P_DOC[$i]}" ] && printf ' %sGet a key: %s%s\n' "$DIM" "${P_DOC[$i]}" "$N"
        printf ' %sPaste your %s (input hidden, empty to cancel)%s\n' "$DIM" "$var" "$N"
        printf ' %s> %s' "$B" "$N"
    } > "$TTY"
    IFS= read -r -s val < "$TTY"
    printf '\n' > "$TTY"

    # strip surrounding whitespace/quotes
    val="${val#"${val%%[![:space:]]*}"}"
    val="${val%"${val##*[![:space:]]}"}"
    case "$val" in
        \"*\") val="${val#\"}"; val="${val%\"}" ;;
        \'*\') val="${val#\'}"; val="${val%\'}" ;;
    esac

    if [ -n "$val" ]; then
        case "$val" in
            *[[:space:]]*) MSG="${RED}key contains whitespace — not saved${N}" ;;
            *)
                S_VAL[$i]="$val"
                S_SRC[$i]="saved"
                S_ON[$i]=1
                MSG="${GRN}${P_NAME[$i]} key set${N} ${DIM}($var, ${#val} chars, $(mask "$val"))${N}"
                ;;
        esac
    else
        MSG="${DIM}cancelled${N}"
    fi
    stty -echo -icanon min 1 time 0 < "$TTY" 2>/dev/null
    printf '\033[?25l\033[2J' > "$TTY"
}

save_all() {
    local i tmp n_on=0 n_keys=0 custom

    custom="$(custom_env_lines)"

    # ---- .env
    tmp="$ENV_FILE.tmp.$$"
    {
        printf '# Managed by llms setup. One VAR=value per line, no quotes.\n'
        printf '# Everything here is passed into the container, so you can add your own\n'
        printf '# environment variables below and they will be preserved.\n'
        printf '\n# --- provider API keys ---\n'
        i=0
        while [ "$i" -lt "$COUNT" ]; do
            if [ "${S_ON[$i]}" = "1" ] && [ -n "${S_VAL[$i]}" ] && [ -n "${S_VAR[$i]}" ]; then
                printf '%s=%s\n' "${S_VAR[$i]}" "${S_VAL[$i]}"
                n_keys=$((n_keys+1))
            fi
            i=$((i+1))
        done
        if [ -n "$custom" ]; then
            printf '\n# --- your settings ---\n'
            printf '%s\n' "$custom"
        fi
    } > "$tmp" || return 1
    chmod 600 "$tmp" 2>/dev/null
    mv "$tmp" "$ENV_FILE" || return 1
    # From here on the keys are already stored; only llms.json can still fail.

    # ---- llms.json
    # The selection goes in a file the container can read; the script itself is
    # written next to it (docker run takes only one stdin).
    tmp="$LLMS_HOME/.llms-setup-selection"
    i=0
    : > "$tmp"
    while [ "$i" -lt "$COUNT" ]; do
        printf '%s\037%s\037%s\n' "${P_ID[$i]}" "${S_ON[$i]}" "${P_LOCAL[$i]}" >> "$tmp"
        [ "${S_ON[$i]}" = "1" ] && n_on=$((n_on+1))
        i=$((i+1))
    done

    cat > "$LLMS_HOME/.llms-setup-save.py" <<'PYEOF'
import json, os, sys

HOME = "/home/llms/.llms"
path = os.path.join(HOME, "llms.json")
with open(path, encoding="utf-8") as f:
    config = json.load(f)
providers = config.setdefault("providers", {})

for line in sys.stdin.read().splitlines():
    if not line.strip():
        continue
    parts = line.split("\x1f")
    if len(parts) < 3:
        continue
    pid, on, is_local = parts[0], parts[1] == "1", parts[2] == "1"
    entry = providers.get(pid)
    if not isinstance(entry, dict):
        if not on:
            continue
        entry = {}
        providers[pid] = entry
    entry["enabled"] = on
    # A container can't reach the host's localhost — rewrite to host.docker.internal
    if on and is_local:
        api = entry.get("api")
        if isinstance(api, str):
            for host in ("localhost", "127.0.0.1", "0.0.0.0"):
                if host in api:
                    entry["api"] = api.replace(host, "host.docker.internal")
                    break

with open(path + ".tmp", "w", encoding="utf-8") as f:
    json.dump(config, f, indent=4)
    f.write("\n")
os.replace(path + ".tmp", path)
PYEOF

    # shellcheck disable=SC2086
    docker run --rm -i $LLMS_DOCKER_USER_ARGS \
        -v "$LLMS_HOME:/home/llms/.llms" \
        --entrypoint python "$LLMS_IMAGE" \
        /home/llms/.llms/.llms-setup-save.py \
        < "$LLMS_HOME/.llms-setup-selection" >/dev/null 2>&1
    rc=$?
    [ "$rc" -ne 0 ] && rc=2
    rm -f "$LLMS_HOME/.llms-setup-selection" "$LLMS_HOME/.llms-setup-save.py"
    SAVED_ON="$n_on"; SAVED_KEYS="$n_keys"
    return $rc
}
# 0 = all good, 1 = .env write failed, 2 = keys saved but llms.json update failed

read_key() {
    local k rest
    IFS= read -rsn1 k < "$TTY" || return 1
    if [ "$k" = $'\033' ]; then
        IFS= read -rsn2 -t 1 rest < "$TTY"
        case "$rest" in
            '[A') printf 'up' ;;
            '[B') printf 'down' ;;
            '[C') printf 'right' ;;
            '[D') printf 'left' ;;
            '[5') IFS= read -rsn1 -t 1 rest < "$TTY"; printf 'pgup' ;;
            '[6') IFS= read -rsn1 -t 1 rest < "$TTY"; printf 'pgdn' ;;
            '')   printf 'esc' ;;
            *)    printf 'other' ;;
        esac
        return 0
    fi
    case "$k" in
        '')  printf 'enter' ;;
        ' ') printf 'space' ;;
        *)   printf '%s' "$k" ;;
    esac
}

draw
while :; do
    KEY="$(read_key)" || break
    case "$KEY" in
        up|k)    [ "$CUR" -gt 0 ] && CUR=$((CUR-1)); MSG="" ;;
        down|j)  [ "$CUR" -lt $((COUNT-1)) ] && CUR=$((CUR+1)); MSG="" ;;
        pgup)    CUR=$((CUR-10)); [ "$CUR" -lt 0 ] && CUR=0; MSG="" ;;
        pgdn)    CUR=$((CUR+10)); [ "$CUR" -gt $((COUNT-1)) ] && CUR=$((COUNT-1)); MSG="" ;;
        g)       CUR=0; MSG="" ;;
        G)       CUR=$((COUNT-1)); MSG="" ;;
        space)
            if [ "${S_ON[$CUR]}" = "1" ]; then
                S_ON[$CUR]=0; MSG=""
            elif [ -n "${S_VAL[$CUR]}" ] || [ "${P_LOCAL[$CUR]}" = "1" ]; then
                S_ON[$CUR]=1; MSG=""
            else
                S_ON[$CUR]=1
                MSG="${YEL}${P_NAME[$CUR]} has no API key yet — press enter to add one${N}"
            fi ;;
        enter|e) prompt_key "$CUR" ;;
        x|d)
            if [ -n "${S_VAL[$CUR]}" ]; then
                S_VAL[$CUR]=""; S_SRC[$CUR]="none"; S_ON[$CUR]=0
                MSG="${DIM}cleared ${P_NAME[$CUR]} key${N}"
            else
                MSG="${DIM}no key to clear${N}"
            fi ;;
        a)
            i=0
            while [ "$i" -lt "$COUNT" ]; do
                { [ -n "${S_VAL[$i]}" ] || [ "${P_LOCAL[$i]}" = "1" ]; } && S_ON[$i]=1
                i=$((i+1))
            done
            MSG="${DIM}enabled every provider with a key${N}" ;;
        n)
            i=0
            while [ "$i" -lt "$COUNT" ]; do S_ON[$i]=0; i=$((i+1)); done
            MSG="${DIM}disabled all${N}" ;;
        s)
            save_all; SAVE_RC=$?
            if [ "$SAVE_RC" -eq 0 ]; then
                restore_tty
                printf '\n%s✓ saved%s — %s provider(s) enabled, %s API key(s) in %s\n' \
                    "$GRN$B" "$N" "${SAVED_ON:-0}" "${SAVED_KEYS:-0}" "$ENV_FILE"
                if [ "$(docker inspect -f '{{.State.Running}}' "${LLMS_CONTAINER:-llms}" 2>/dev/null)" = "true" ]; then
                    printf '  %srestart the server to pick up the changes:%s llms restart\n' "$DIM" "$N"
                else
                    printf '  %sstart the server:%s llms up   %s→ http://localhost:%s%s\n' "$DIM" "$N" "$DIM" "$LLMS_PORT" "$N"
                fi
                printf '\n'
                exit 0
            elif [ "$SAVE_RC" -eq 2 ]; then
                MSG="${RED}API keys saved, but could not update llms.json${N} ${DIM}— check permissions on $LLMS_HOME${N}"
            else
                MSG="${RED}could not write $ENV_FILE${N} ${DIM}— check permissions on $LLMS_HOME${N}"
            fi ;;
        q|esc)
            restore_tty
            printf '\n%sno changes saved%s\n\n' "$DIM" "$N"
            exit 0 ;;
        *) MSG="" ;;
    esac
    draw
done

restore_tty
exit 0
