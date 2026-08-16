#!/usr/bin/env bash
#
#   curl -fsSL https://llmspy.org/install.sh | bash
#
# Installs (or updates) llms.py as a Docker container plus an `llms` command
# on your PATH that wraps it. Safe to re-run: it pulls the latest image,
# refreshes the wrapper, and re-opens the provider setup screen.
#
# Options (pass after `| bash -s --`):
#   --no-setup        don't open the provider setup screen
#   --no-pull         skip pulling the image
#   --setup-only      just re-open the provider setup screen
#   --image IMAGE     image to use (default ghcr.io/servicestack/llms:latest)
#   --port PORT       host port for the server (default 8000)
#   --bind ADDR       host address to publish on (default 127.0.0.1)
#   --dir DIR         config directory (default ~/.llms)
#   --bin-dir DIR     where to install the `llms` command
#   --uninstall       remove the command and container (keeps your config)
#
# Written for bash 3.2+ so it works on stock macOS.

set -u

# --------------------------------------------------------------- defaults ---

LLMS_BASE_URL="${LLMS_BASE_URL:-https://llmspy.org}"
LLMS_HOME="${LLMS_HOME:-$HOME/.llms}"
LLMS_IMAGE="${LLMS_IMAGE:-ghcr.io/servicestack/llms:latest}"
LLMS_PORT="${LLMS_PORT:-8000}"
LLMS_BIND="${LLMS_BIND:-127.0.0.1}"
LLMS_CONTAINER="${LLMS_CONTAINER:-llms}"
usage() {
    cat <<'USAGE'
llms.py installer — installs llms.py as a Docker container plus an `llms`
command on your PATH. Safe to re-run: pulls the latest image, refreshes the
wrapper, and re-opens the provider setup screen.

  curl -fsSL https://llmspy.org/install.sh | bash
  curl -fsSL https://llmspy.org/install.sh | bash -s -- [options]

Options:
  --no-setup        don't open the provider setup screen
  --no-pull         skip pulling the image
  --setup-only      just re-open the provider setup screen
  --image IMAGE     image to use (default ghcr.io/servicestack/llms:latest)
  --port PORT       host port for the server (default 8000)
  --bind ADDR       host address to publish on (default 127.0.0.1)
  --dir DIR         config directory (default ~/.llms)
  --bin-dir DIR     where to install the `llms` command
  --uninstall       remove the command and container (keeps your config)
USAGE
}

BIN_DIR=""
DO_PULL=1
DO_SETUP=1
SETUP_ONLY=0
UNINSTALL=0
SETTINGS_CHANGED=0

while [ $# -gt 0 ]; do
    case "$1" in
        --no-setup)   DO_SETUP=0; shift ;;
        --no-pull)    DO_PULL=0; shift ;;
        --setup-only) SETUP_ONLY=1; shift ;;
        --uninstall)  UNINSTALL=1; shift ;;
        --image)      LLMS_IMAGE="$2"; SETTINGS_CHANGED=1; shift 2 ;;
        --image=*)    LLMS_IMAGE="${1#*=}"; SETTINGS_CHANGED=1; shift ;;
        --port)       LLMS_PORT="$2"; SETTINGS_CHANGED=1; shift 2 ;;
        --port=*)     LLMS_PORT="${1#*=}"; SETTINGS_CHANGED=1; shift ;;
        --bind)       LLMS_BIND="$2"; SETTINGS_CHANGED=1; shift 2 ;;
        --bind=*)     LLMS_BIND="${1#*=}"; SETTINGS_CHANGED=1; shift ;;
        --dir)        LLMS_HOME="$2"; shift 2 ;;
        --dir=*)      LLMS_HOME="${1#*=}"; shift ;;
        --bin-dir)    BIN_DIR="$2"; shift 2 ;;
        --bin-dir=*)  BIN_DIR="${1#*=}"; shift ;;
        -h|--help)    usage; exit 0 ;;
        *)            echo "install.sh: unknown option '$1'" >&2; exit 2 ;;
    esac
done

# ----------------------------------------------------------------- output ---

if [ -t 1 ] && [ -z "${NO_COLOR:-}" ]; then
    B=$'\033[1m'; DIM=$'\033[2m'; RED=$'\033[31m'; GRN=$'\033[32m'
    YEL=$'\033[33m'; CYA=$'\033[36m'; N=$'\033[0m'
else
    B=""; DIM=""; RED=""; GRN=""; YEL=""; CYA=""; N=""
fi

say()  { printf '%s\n' "$*"; }
step() { printf '%s==>%s %s\n' "$CYA$B" "$N" "$*"; }
ok()   { printf '  %s✓%s %s\n' "$GRN" "$N" "$*"; }
warn() { printf '  %s!%s %s\n' "$YEL" "$N" "$*"; }
note() { printf '    %s%s%s\n' "$DIM" "$*" "$N"; }
die()  { printf '\n%serror:%s %s\n' "$RED$B" "$N" "$*" >&2; exit 1; }

# ------------------------------------------------------------ environment ---

OS="$(uname -s 2>/dev/null || echo unknown)"

docker_install_hint() {
    case "$OS" in
        Darwin) say "  brew install --cask docker        ${DIM}# or https://docs.docker.com/desktop/install/mac-install/${N}" ;;
        Linux)  say "  curl -fsSL https://get.docker.com | sh" ;;
        *)      say "  https://docs.docker.com/get-docker/" ;;
    esac
}

require_docker() {
    command -v docker >/dev/null 2>&1 || {
        printf '\n%serror:%s Docker is required but was not found.\n\n' "$RED$B" "$N" >&2
        docker_install_hint >&2
        printf '\n' >&2
        exit 1
    }
    docker info >/dev/null 2>&1 || {
        printf '\n%serror:%s Docker is installed but the daemon is not running.\n\n' "$RED$B" "$N" >&2
        case "$OS" in
            Darwin) say "  Start Docker Desktop, then re-run this installer." >&2 ;;
            Linux)  say "  sudo systemctl start docker" >&2
                    say "  ${DIM}(and 'sudo usermod -aG docker \$USER' if you need to run docker without sudo)${N}" >&2 ;;
            *)      say "  Start the Docker daemon, then re-run this installer." >&2 ;;
        esac
        printf '\n' >&2
        exit 1
    }
}

# --------------------------------------------------------------- uninstall --

if [ "$UNINSTALL" -eq 1 ]; then
    step "Uninstalling llms"
    if command -v docker >/dev/null 2>&1; then
        docker rm -f "$LLMS_CONTAINER" >/dev/null 2>&1 && ok "removed container '$LLMS_CONTAINER'"
    fi
    removed=0
    for d in "$HOME/.local/bin" /usr/local/bin "$HOME/bin" "$LLMS_HOME/bin"; do
        for f in llms llms-docker llms-server llms-setup; do
            [ -e "$d/$f" ] || [ -L "$d/$f" ] || continue
            drop=0
            grep -q 'llmspy.org/install.sh' "$d/$f" 2>/dev/null && drop=1
            if [ -L "$d/$f" ]; then
                case "$(readlink "$d/$f")" in "$LLMS_HOME"/*) drop=1 ;; esac
            fi
            if [ "$drop" -eq 1 ]; then
                rm -f "$d/$f" && ok "removed $d/$f" && removed=1
            fi
        done
    done
    [ "$removed" -eq 0 ] && warn "no installed llms commands found"
    say ""
    say "Your config and chat history are untouched in $LLMS_HOME"
    say "Remove it with: ${B}rm -rf $LLMS_HOME${N}"
    say ""
    exit 0
fi

# ---------------------------------------------------------------- preflight --

printf '\n%sllms.py installer%s\n\n' "$B" "$N"

step "Checking prerequisites"
require_docker
ok "docker $(docker version --format '{{.Server.Version}}' 2>/dev/null || echo '')"

if docker compose version >/dev/null 2>&1; then
    ok "docker compose $(docker compose version --short 2>/dev/null)"
    HAS_COMPOSE=1
else
    warn "docker compose not found — the 'llms' command works without it"
    HAS_COMPOSE=0
fi

mkdir -p "$LLMS_HOME/bin" || die "could not create $LLMS_HOME"

# ------------------------------------------------------------------- pull ---

if [ "$SETUP_ONLY" -eq 0 ]; then
    if [ "$DO_PULL" -eq 1 ]; then
        step "Pulling $LLMS_IMAGE"
        BEFORE="$(docker image inspect --format '{{index .RepoDigests 0}}' "$LLMS_IMAGE" 2>/dev/null)"
        docker pull "$LLMS_IMAGE" >/dev/null 2>&1 || die "could not pull $LLMS_IMAGE"
        AFTER="$(docker image inspect --format '{{index .RepoDigests 0}}' "$LLMS_IMAGE" 2>/dev/null)"
        if [ -n "$BEFORE" ] && [ "$BEFORE" = "$AFTER" ]; then
            ok "already up to date"
        elif [ -n "$BEFORE" ]; then
            ok "updated"
            note "was ${BEFORE#*@}"
            note "now ${AFTER#*@}"
        else
            ok "downloaded"
            note "${AFTER#*@}"
        fi
    else
        docker image inspect "$LLMS_IMAGE" >/dev/null 2>&1 || die "$LLMS_IMAGE not present locally and --no-pull was given"
        ok "using local image $LLMS_IMAGE"
    fi
fi

# ---------------------------------------------------- initialise config dir --

# On Linux a uid other than 1000 can't write to the bind-mounted config dir
# unless we run the container as the invoking user.
DOCKER_USER_ARGS=""
if [ "$OS" = "Linux" ]; then
    MY_UID="$(id -u)"; MY_GID="$(id -g)"
    if [ "$MY_UID" != "1000" ]; then
        DOCKER_USER_ARGS="--user $MY_UID:$MY_GID"
    fi
fi

step "Preparing $LLMS_HOME"
if [ ! -f "$LLMS_HOME/llms.json" ] || [ ! -f "$LLMS_HOME/providers.json" ]; then
    # shellcheck disable=SC2086
    docker run --rm $DOCKER_USER_ARGS -v "$LLMS_HOME:/home/llms/.llms" \
        --entrypoint llms "$LLMS_IMAGE" --init >/dev/null 2>&1 \
        || die "could not initialise config in $LLMS_HOME"
    ok "created llms.json and providers.json"
else
    ok "config already present"
fi

if [ ! -f "$LLMS_HOME/.env" ]; then
    : > "$LLMS_HOME/.env"
    ok "created .env"
fi
chmod 600 "$LLMS_HOME/.env" 2>/dev/null

# Settings shared by the wrapper and the setup screen. Left alone on re-install
# unless --image/--port/--bind was passed, so hand edits survive an update.
if [ ! -f "$LLMS_HOME/config" ] || [ "$SETTINGS_CHANGED" -eq 1 ]; then
    cat > "$LLMS_HOME/config" <<CONFIG_EOF
# Settings for the 'llms' command. Edit freely — re-running the installer
# leaves this file alone unless you pass --image, --port or --bind.
# Every value can also be overridden per-command with an env var of the same name.
LLMS_IMAGE="\${LLMS_IMAGE:-$LLMS_IMAGE}"
LLMS_PORT="\${LLMS_PORT:-$LLMS_PORT}"
LLMS_BIND="\${LLMS_BIND:-$LLMS_BIND}"
LLMS_CONTAINER="\${LLMS_CONTAINER:-$LLMS_CONTAINER}"
LLMS_DOCKER_USER_ARGS="\${LLMS_DOCKER_USER_ARGS:-$DOCKER_USER_ARGS}"
CONFIG_EOF
    ok "wrote config"
else
    ok "kept existing config"
    # shellcheck disable=SC1091
    . "$LLMS_HOME/config"
fi

# ---------------------------------------------------- docker-compose.yml -----

cat > "$LLMS_HOME/docker-compose.yml" <<COMPOSE_EOF
# Generated by llmspy.org/install.sh
# Optional — the 'llms' command does not need this file.
#   cd $LLMS_HOME && docker compose up -d
services:
  llms:
    image: $LLMS_IMAGE
    container_name: $LLMS_CONTAINER
    ports:
      - "$LLMS_BIND:$LLMS_PORT:8000"
    env_file:
      - .env
    volumes:
      - .:/home/llms/.llms
    extra_hosts:
      - "host.docker.internal:host-gateway"
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "python", "-c", "import urllib.request; urllib.request.urlopen('http://localhost:8000').read()"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 10s
COMPOSE_EOF
[ "$HAS_COMPOSE" -eq 1 ] && ok "wrote docker-compose.yml"

# ---------------------------------------------------------- setup script -----

fetch() {
    # fetch <url> <dest>
    if command -v curl >/dev/null 2>&1; then
        curl -fsSL "$1" -o "$2"
    elif command -v wget >/dev/null 2>&1; then
        wget -qO "$2" "$1"
    else
        return 1
    fi
}

if [ "$SETUP_ONLY" -eq 0 ]; then
    step "Installing commands"
    # When run from a checkout, use the setup.sh sitting next to us instead of
    # downloading it. When piped from curl, BASH_SOURCE is not a real path.
    SELF_DIR=""
    SELF="${BASH_SOURCE[0]:-}"
    if [ -n "$SELF" ] && [ -f "$SELF" ]; then
        SELF_DIR="$(cd "$(dirname "$SELF")" 2>/dev/null && pwd)"
    fi
    if [ -n "$SELF_DIR" ] && [ -f "$SELF_DIR/setup.sh" ]; then
        cp "$SELF_DIR/setup.sh" "$LLMS_HOME/bin/llms-setup"
        ok "installed llms-setup (from $SELF_DIR/setup.sh)"
    elif fetch "$LLMS_BASE_URL/setup.sh" "$LLMS_HOME/bin/llms-setup.tmp"; then
        mv "$LLMS_HOME/bin/llms-setup.tmp" "$LLMS_HOME/bin/llms-setup"
        ok "installed llms-setup"
    else
        rm -f "$LLMS_HOME/bin/llms-setup.tmp"
        die "could not download $LLMS_BASE_URL/setup.sh"
    fi
    chmod +x "$LLMS_HOME/bin/llms-setup"
fi

# -------------------------------------------------------------- wrapper -----

if [ "$SETUP_ONLY" -eq 0 ]; then
{
printf '#!/usr/bin/env bash\n'
printf '# llms — runs llms.py in Docker. Generated by llmspy.org/install.sh\n'
printf 'LLMS_HOME="${LLMS_HOME:-%s}"\n' "$LLMS_HOME"
cat <<'WRAPPER_EOF'
set -u

[ -f "$LLMS_HOME/config" ] && . "$LLMS_HOME/config"
LLMS_IMAGE="${LLMS_IMAGE:-ghcr.io/servicestack/llms:latest}"
LLMS_PORT="${LLMS_PORT:-8000}"
LLMS_BIND="${LLMS_BIND:-127.0.0.1}"
LLMS_CONTAINER="${LLMS_CONTAINER:-llms}"
LLMS_DOCKER_USER_ARGS="${LLMS_DOCKER_USER_ARGS:-}"

if [ -t 1 ] && [ -z "${NO_COLOR:-}" ]; then
    B=$'\033[1m'; DIM=$'\033[2m'; RED=$'\033[31m'; GRN=$'\033[32m'; N=$'\033[0m'
else
    B=""; DIM=""; RED=""; GRN=""; N=""
fi
die() { printf '%sllms:%s %s\n' "$RED$B" "$N" "$*" >&2; exit 1; }

command -v docker >/dev/null 2>&1 || die "docker not found on PATH"
docker info >/dev/null 2>&1 || die "the Docker daemon is not running"

COMMON_ARGS="-v $LLMS_HOME:/home/llms/.llms --add-host=host.docker.internal:host-gateway"
[ -n "$LLMS_DOCKER_USER_ARGS" ] && COMMON_ARGS="$COMMON_ARGS $LLMS_DOCKER_USER_ARGS"
ENV_ARGS=""
[ -s "$LLMS_HOME/.env" ] && ENV_ARGS="--env-file $LLMS_HOME/.env"

server_running() { [ "$(docker inspect -f '{{.State.Running}}' "$LLMS_CONTAINER" 2>/dev/null)" = "true" ]; }

server_up() {
    local port="${1:-$LLMS_PORT}"
    docker rm -f "$LLMS_CONTAINER" >/dev/null 2>&1
    # shellcheck disable=SC2086
    docker run -d --name "$LLMS_CONTAINER" \
        -p "$LLMS_BIND:$port:8000" \
        --restart unless-stopped \
        $COMMON_ARGS $ENV_ARGS \
        "$LLMS_IMAGE" llms --serve 8000 >/dev/null || die "could not start the container"
    printf '%sllms is starting on%s http://localhost:%s\n' "$DIM" "$N" "$port"
    local i code
    for i in $(seq 1 60); do
        code=$(curl -s -o /dev/null -w '%{http_code}' --max-time 2 "http://127.0.0.1:$port/" 2>/dev/null)
        [ "$code" = "200" ] && { printf '%s✓%s ready at %shttp://localhost:%s%s\n' "$GRN" "$N" "$B" "$port" "$N"; return 0; }
        server_running || { docker logs "$LLMS_CONTAINER" 2>&1 | tail -20; die "the container exited"; }
        sleep 1
    done
    printf '%sstill starting — check: llms logs%s\n' "$DIM" "$N"
}

usage() {
    cat <<'USAGE'
llms — llms.py in Docker

  llms <prompt>              ask the default model
  llms ls [provider]         list enabled providers and models
  llms --check <provider>    verify a provider's models
  llms --serve [port]        start the server (same as: llms up)
  ...any other llms CLI args are passed straight through

Container management:
  llms up [port]             start the server in the background
  llms down                  stop and remove the server
  llms restart               restart the server
  llms status                show whether the server is running
  llms logs [-f]             show server logs
  llms setup                 choose providers and enter API keys
  llms update                pull the latest image and restart
  llms shell                 open a shell inside the container
  llms uninstall             remove the llms command and container

Config lives in $LLMS_HOME (llms.json, providers.json, .env)
USAGE
}

case "${1:-}" in
    up|start)
        shift; server_up "${1:-$LLMS_PORT}" ;;
    down|stop)
        docker rm -f "$LLMS_CONTAINER" >/dev/null 2>&1 \
            && printf '%sstopped%s\n' "$DIM" "$N" \
            || printf '%snot running%s\n' "$DIM" "$N" ;;
    restart)
        server_up "$LLMS_PORT" ;;
    status)
        if server_running; then
            printf '%s✓%s running — %s\n' "$GRN" "$N" \
                "$(docker inspect -f '{{range $p, $c := .NetworkSettings.Ports}}{{$p}} -> {{range $c}}{{.HostIp}}:{{.HostPort}}{{end}} {{end}}' "$LLMS_CONTAINER" 2>/dev/null)"
            docker inspect -f '  image:  {{.Config.Image}}{{if .State.Health}}{{"\n"}}  health: {{.State.Health.Status}}{{end}}' "$LLMS_CONTAINER" 2>/dev/null
        else
            printf '%snot running%s — start it with: %sllms up%s\n' "$DIM" "$N" "$B" "$N"
        fi ;;
    logs)
        shift; docker logs "$@" "$LLMS_CONTAINER" ;;
    setup)
        shift; exec "$LLMS_HOME/bin/llms-setup" "$@" ;;
    update)
        docker pull "$LLMS_IMAGE" || die "pull failed"
        if server_running; then server_up "$LLMS_PORT"; else printf '%s✓%s image updated\n' "$GRN" "$N"; fi ;;
    shell)
        # shellcheck disable=SC2086
        exec docker run --rm -it $COMMON_ARGS $ENV_ARGS --entrypoint bash "$LLMS_IMAGE" ;;
    uninstall)
        exec bash -c 'curl -fsSL "${LLMS_BASE_URL:-https://llmspy.org}/install.sh" | bash -s -- --uninstall' ;;
    help|--help|-h|"")
        usage ;;
    --serve)
        shift; server_up "${1:-$LLMS_PORT}" ;;
    *)
        TTY_ARGS="-i"
        [ -t 0 ] && [ -t 1 ] && TTY_ARGS="-it"
        # shellcheck disable=SC2086
        exec docker run --rm $TTY_ARGS $COMMON_ARGS $ENV_ARGS \
            -v "$PWD:/work" -w /work \
            --entrypoint llms "$LLMS_IMAGE" "$@" ;;
esac
WRAPPER_EOF
} > "$LLMS_HOME/bin/llms"
chmod +x "$LLMS_HOME/bin/llms"
ok "installed llms"
fi

# ------------------------------------------------------- put it on PATH -----

link_into_path() {
    # Pick a bin dir: explicit > ~/.local/bin > /usr/local/bin (if writable) > ~/bin
    if [ -z "$BIN_DIR" ]; then
        if [ -d "$HOME/.local/bin" ] || mkdir -p "$HOME/.local/bin" 2>/dev/null; then
            BIN_DIR="$HOME/.local/bin"
        elif [ -w /usr/local/bin ]; then
            BIN_DIR="/usr/local/bin"
        else
            mkdir -p "$HOME/bin" 2>/dev/null && BIN_DIR="$HOME/bin"
        fi
    fi
    [ -n "$BIN_DIR" ] || die "could not find a writable bin directory (pass --bin-dir)"
    mkdir -p "$BIN_DIR" 2>/dev/null

    # Is there already a different `llms` earlier on PATH?
    EXISTING="$(command -v llms 2>/dev/null)"
    SHADOWED=0
    if [ -n "$EXISTING" ] && [ "$EXISTING" != "$BIN_DIR/llms" ] \
       && ! grep -q 'llmspy.org/install.sh' "$EXISTING" 2>/dev/null; then
        SHADOWED=1
    fi

    ln -sf "$LLMS_HOME/bin/llms" "$BIN_DIR/llms" || die "could not link into $BIN_DIR"
    ok "linked $BIN_DIR/llms"

    if [ "$SHADOWED" -eq 1 ]; then
        ln -sf "$LLMS_HOME/bin/llms" "$BIN_DIR/llms-docker"
        warn "another 'llms' already exists at $EXISTING"
        note "that is probably the pip package (pip install llms-py)"
        note "the Docker version is also available as: llms-docker"
        case ":$PATH:" in
            *":$BIN_DIR:"*)
                if [ "$(command -v llms)" != "$BIN_DIR/llms" ]; then
                    note "$EXISTING comes first on your PATH, so 'llms' still runs it"
                fi ;;
        esac
    fi

    case ":$PATH:" in
        *":$BIN_DIR:"*) : ;;
        *)
            warn "$BIN_DIR is not on your PATH"
            case "${SHELL:-}" in
                */zsh)  note "echo 'export PATH=\"$BIN_DIR:\$PATH\"' >> ~/.zshrc && exec zsh" ;;
                */bash) note "echo 'export PATH=\"$BIN_DIR:\$PATH\"' >> ~/.bashrc && exec bash" ;;
                */fish) note "fish_add_path $BIN_DIR" ;;
                *)      note "add $BIN_DIR to your PATH" ;;
            esac
            NEEDS_PATH=1 ;;
    esac
}

NEEDS_PATH=0
[ "$SETUP_ONLY" -eq 0 ] && link_into_path

# ---------------------------------------------------------------- setup -----

if [ "$DO_SETUP" -eq 1 ] || [ "$SETUP_ONLY" -eq 1 ]; then
    if [ ! -x "$LLMS_HOME/bin/llms-setup" ]; then
        warn "llms-setup is not installed — re-run without --setup-only"
    elif [ -r /dev/tty ] && [ -w /dev/tty ]; then
        say ""
        export LLMS_HOME LLMS_DOCKER_USER_ARGS="$DOCKER_USER_ARGS"
        "$LLMS_HOME/bin/llms-setup" < /dev/tty
    else
        warn "no terminal available — skipping provider setup"
        note "run it later with: llms setup"
    fi
fi

# --------------------------------------------------------------- summary ----

if [ "$SETUP_ONLY" -eq 1 ]; then exit 0; fi

CMD="llms"
[ "$NEEDS_PATH" -eq 1 ] && CMD="$LLMS_HOME/bin/llms"

say ""
printf '%sInstalled.%s\n\n' "$GRN$B" "$N"
say "  ${B}$CMD up${N}                 start the server on http://localhost:$LLMS_PORT"
say "  ${B}$CMD setup${N}              choose providers / enter API keys"
say "  ${B}$CMD ls${N}                 list enabled models"
say "  ${B}$CMD \"hello\"${N}            ask the default model"
say "  ${B}$CMD help${N}               everything else"
say ""
say "  ${DIM}config:  $LLMS_HOME${N}"
say "  ${DIM}update:  curl -fsSL $LLMS_BASE_URL/install.sh | bash${N}"
say ""
