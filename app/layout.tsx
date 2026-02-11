import type { Metadata } from 'next';
import { Provider } from './provider';
import './global.css';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | llmspy.org',
    default: 'llmspy.org',
  },
  description: 'Lightweight OpenAI compatible CLI and server gateway for multiple LLMs',
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
