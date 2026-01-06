import type { ReactNode } from 'react';

interface InfoProps {
  children: ReactNode;
  title?: string;
}

/**
 * A Vue-style info component for documentation.
 * Displays an info callout with a blue accent, similar to VitePress/VuePress info blocks.
 */
export function Info({ children, title = 'INFO' }: InfoProps) {
  return (
    <div className="my-4 rounded-lg border border-blue-200 bg-blue-50 dark:border-blue-900/50 dark:bg-blue-950/30">
      <div className="flex items-start gap-3 px-4 pb-4 pt-2">
        <div className="flex-1">
          <p className="mb-2 text-sm font-semibold uppercase text-blue-700 dark:text-blue-400">
            {title}
          </p>
          <div className="text-sm text-blue-800 dark:text-blue-200 [&>p]:m-0 [&>p:not(:last-child)]:mb-2">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

