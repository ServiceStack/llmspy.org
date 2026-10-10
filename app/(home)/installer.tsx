'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Container, Download, Monitor, Package } from 'lucide-react';
import { CopyBlock } from './copy-block';

const version = '4.0.23';
const releaseUrl = `https://github.com/ServiceStack/llms/releases/tag/v${version}`;
const downloadUrl = `https://github.com/ServiceStack/llms/releases/download/v${version}`;

type Platform = 'macos' | 'windows' | 'linux';
type Method = 'desktop' | 'docker' | 'python';
type Mode = 'install' | 'update';

const platforms: { id: Platform; label: string; downloads: { label: string; file: string }[]; note: string }[] = [
  {
    id: 'macos', label: 'macOS',
    downloads: [
      { label: 'Apple Silicon · .dmg', file: `llms_${version}_aarch64.dmg` },
      { label: 'Intel · .dmg', file: `llms_${version}_x64.dmg` },
    ],
    note: 'Choose the installer for your Mac, then open the disk image to install llms.',
  },
  {
    id: 'windows', label: 'Windows',
    downloads: [{ label: 'Windows x64 · .exe', file: `llms_${version}_x64-setup.exe` }],
    note: 'Download and run the Windows installer.',
  },
  {
    id: 'linux', label: 'Linux',
    downloads: [
      { label: 'AppImage · x64', file: `llms_${version}_amd64.AppImage` },
      { label: 'Debian / Ubuntu · .deb', file: `llms_${version}_amd64.deb` },
    ],
    note: 'Make the AppImage executable to run it, or install the .deb on Debian / Ubuntu.',
  },
];

const methods = [
  { id: 'desktop', label: 'Desktop', icon: Monitor },
  { id: 'docker', label: 'Docker', icon: Container },
  { id: 'python', label: 'llms-py', icon: Package },
] as const;

const focus = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500';
const commandStyle = 'text-left [&_code]:whitespace-pre-wrap [&_code]:break-all [&_code]:overflow-visible [&_code]:text-clip';

function ResetConfig() {
  return (
    <>
      <p className="text-sm text-slate-600 dark:text-slate-400">To reset your configuration to the latest <code>llms.json</code> and <code>providers-extra.json</code>, run:</p>
      <CopyBlock className={commandStyle}>llms --reset all</CopyBlock>
    </>
  );
}

export function Installer() {
  const [method, setMethod] = useState<Method>('desktop');
  const [mode, setMode] = useState<Mode>('install');
  const [platform, setPlatform] = useState<Platform | null>(null);

  useEffect(() => {
    const browser = navigator as Navigator & { userAgentData?: { platform?: string } };
    const os = browser.userAgentData?.platform || navigator.platform || navigator.userAgent;
    // Mobile browsers should let the visitor choose a desktop OS.
    if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
        (/Mac/i.test(os) && navigator.maxTouchPoints > 1)) return;
    if (/Win/i.test(os)) setPlatform('windows');
    else if (/Mac/i.test(os)) setPlatform('macos');
    else if (/Linux/i.test(os)) setPlatform('linux');
  }, []);

  const selected = platforms.find(item => item.id === platform);

  return (
    <section id="install" aria-labelledby="installer-title" className="not-prose mx-auto w-full max-w-3xl overflow-hidden rounded-2xl border border-blue-200 bg-white text-left shadow-xl shadow-blue-950/5 dark:border-blue-800 dark:bg-slate-900 dark:shadow-blue-950/20">
      <div className="border-b border-slate-200 bg-gradient-to-r from-blue-50 to-indigo-50 px-5 py-5 sm:px-8 dark:border-slate-700 dark:from-blue-950/40 dark:to-indigo-950/40">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 id="installer-title" className="text-2xl font-bold text-slate-900 dark:text-slate-100">Get llms.py</h2>
          <a href={releaseUrl} className={`rounded text-sm text-blue-600 hover:underline dark:text-blue-400 ${focus}`}>Desktop v{version} ↗</a>
        </div>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Every AI model, one app and data you own.</p>
        <div role="group" aria-label="Installation method" className="mt-5 grid grid-cols-3 gap-2">
          {methods.map(({ id, label, icon: Icon }) => (
            <button key={id} type="button" aria-pressed={method === id} aria-controls="installer-content" onClick={() => setMethod(id)}
              className={`inline-flex items-center justify-center gap-2 rounded-lg border px-2 py-3 text-sm font-semibold transition-colors ${focus} ${method === id ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'}`}>
              <Icon aria-hidden="true" className="size-4 shrink-0" />{label}
            </button>
          ))}
        </div>
      </div>
      <div id="installer-content" className="space-y-5 px-5 py-6 sm:px-8">
        <div role="group" aria-label="Install or update" className="flex gap-6 border-b border-slate-200 dark:border-slate-700">
          {(['install', 'update'] as const).map(id => (
            <button key={id} type="button" aria-pressed={mode === id} onClick={() => setMode(id)}
              className={`-mb-px border-b-2 pb-2 text-sm font-semibold capitalize transition-colors ${focus} ${mode === id ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400' : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'}`}>
              {id}
            </button>
          ))}
        </div>
        {method === 'desktop' && (
          <>
            {mode === 'update' && (
              <p className="text-sm text-slate-600 dark:text-slate-400">Check for updates from the app&apos;s menu, or download the latest version below and install it over your existing app. Your config and data in <code>~/.llms</code> are kept.</p>
            )}
            <div role="group" aria-label="Desktop operating system" className="flex flex-wrap gap-2">
              {platforms.map(({ id, label }) => (
                <button key={id} type="button" aria-pressed={platform === id} onClick={() => setPlatform(id)}
                  className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${focus} ${platform === id ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300' : 'border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800'}`}>
                  {label}
                </button>
              ))}
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">{selected?.note || 'Choose your desktop operating system to see the downloads.'}</p>
            <div className="flex flex-wrap gap-3">
              {selected?.downloads.map(({ label, file }) => (
                <a key={file} href={`${downloadUrl}/${file}`} className={`inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 ${focus}`}>
                  <Download aria-hidden="true" className="size-4" />{label}
                </a>
              ))}
            </div>
            <a href={releaseUrl} className={`inline-block rounded text-sm text-blue-600 hover:underline dark:text-blue-400 ${focus}`}>All desktop downloads →</a>
          </>
        )}
        {method === 'docker' && mode === 'update' && (
          <>
            <p className="text-sm text-slate-600 dark:text-slate-400">Pull the latest image and restart the server. Your config and data in <code>~/.llms</code> are kept.</p>
            <CopyBlock className={commandStyle}>llms update</CopyBlock>
            <p className="text-sm text-slate-600 dark:text-slate-400">Or re-run the installer, which also refreshes the <code>llms</code> command and re-opens the provider setup screen:</p>
            <CopyBlock className={commandStyle}>{'curl -fsSL https://llmspy.org/install.sh | bash'}</CopyBlock>
            <ResetConfig />
          </>
        )}
        {method === 'docker' && mode === 'install' && (
          <>
            <p className="text-sm text-slate-600 dark:text-slate-400">Install llms.py with Docker. The installer pulls the image, adds an <code>llms</code> command, and opens a setup screen to pick providers and enter API keys. Your config is kept in <code>~/.llms</code>, shared with the Desktop and pip installs. macOS and Linux only; on Windows, use WSL.</p>
            <CopyBlock className={commandStyle}>{'curl -fsSL https://llmspy.org/install.sh | bash'}</CopyBlock>
            <p className="text-sm text-slate-600 dark:text-slate-400">Then run <code>llms up</code> and open <a href="http://localhost:8000" className={`rounded text-blue-600 hover:underline dark:text-blue-400 ${focus}`}>localhost:8000</a>. <a href="/install.sh" className={`rounded text-blue-600 hover:underline dark:text-blue-400 ${focus}`}>Read the script</a> before running it.</p>
            <Link href="/docs/deployment/install" className={`inline-block rounded text-sm text-blue-600 hover:underline dark:text-blue-400 ${focus}`}>Installer details &amp; options →</Link>
            <Link href="/docs/deployment/docker" className={`ml-2 inline-block rounded text-sm text-blue-600 hover:underline dark:text-blue-400 ${focus}`}>Manual Docker setup &amp; configuration →</Link>
          </>
        )}
        {method === 'python' && mode === 'update' && (
          <>
            <p className="text-sm text-slate-600 dark:text-slate-400">Upgrade the Python package to the latest version:</p>
            <CopyBlock className={commandStyle}>pip install llms-py --upgrade</CopyBlock>
            <p className="text-sm text-slate-600 dark:text-slate-400">Then update any external extensions:</p>
            <CopyBlock className={commandStyle}>llms --update all</CopyBlock>
            <ResetConfig />
          </>
        )}
        {method === 'python' && mode === 'install' && (
          <>
            <p className="text-sm text-slate-600 dark:text-slate-400">Install the Python package for the CLI and web server.</p>
            <CopyBlock className={commandStyle}>pip install llms-py</CopyBlock>
            <CopyBlock className={commandStyle}>llms --serve 8000</CopyBlock>
            <p className="text-sm text-slate-600 dark:text-slate-400">Then open <a href="http://localhost:8000" className={`rounded text-blue-600 hover:underline dark:text-blue-400 ${focus}`}>localhost:8000</a>.</p>
            <div className="flex flex-wrap gap-4 text-sm">
              <a href="https://pypi.org/project/llms-py/" className={`rounded text-blue-600 hover:underline dark:text-blue-400 ${focus}`}>llms-py on PyPI ↗</a>
              <Link href="/docs/getting-started" className={`rounded text-blue-600 hover:underline dark:text-blue-400 ${focus}`}>Getting started →</Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
