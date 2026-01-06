import type { ReactNode } from 'react';

interface TipProps {
  children: ReactNode;
  title?: string;
}

/**
 * A Vue-style tip component for documentation.
 * Displays a tip callout with a green accent, similar to VitePress/VuePress tip blocks.
 */
export function Tip({ children, title = 'TIP' }: TipProps) {
  return (
    <div className="my-4 rounded-lg border border-green-200 bg-green-50 dark:border-green-900/50 dark:bg-green-950/30">
      <div className="flex items-start gap-3 px-4 pb-4 pt-2">
        <div className="flex-1">
          <p className="mb-2 text-sm font-semibold uppercase text-green-700 dark:text-green-400">
            {title}
          </p>
          <div className="text-sm text-green-800 dark:text-green-200 [&>p]:m-0 [&>p:not(:last-child)]:mb-2">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

