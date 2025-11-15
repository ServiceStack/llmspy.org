import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="inline-flex items-center gap-1.5">
          <span>llms.py</span>
        </span>
      ),
      url: '/',
    },
    githubUrl: 'https://github.com/ServiceStack/llms',
  };
}
