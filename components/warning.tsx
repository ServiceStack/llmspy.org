import type { ReactNode } from 'react';

interface WarningProps {
  children: ReactNode;
  title?: string;
}

/**
 * A Vue-style warning component for documentation.
 * Displays a warning callout with a yellow accent, similar to VitePress/VuePress warning blocks.
 */
export function Warning({ children, title = 'WARNING' }: WarningProps) {
  return (
    <div className="my-4 rounded-lg border border-yellow-200 bg-yellow-50 dark:border-yellow-900/50 dark:bg-yellow-950/30">
      <div className="flex items-start gap-3 px-4 pb-4 pt-2">
        <div className="flex-1">
          <p className="mb-2 text-sm font-semibold uppercase text-yellow-700 dark:text-yellow-400">
            {title}
          </p>
          <div className="text-sm text-yellow-800 dark:text-yellow-200 [&>p]:m-0 [&>p:not(:last-child)]:mb-2">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

