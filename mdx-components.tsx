import type { MDXComponents } from 'mdx/types';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { Steps, Step } from 'fumadocs-ui/components/steps';
import { CopyBlock } from '@/app/(home)/copy-block';
import { Info } from '@/components/info';
import { Warning } from '@/components/warning';
import { Tip } from '@/components/tip';
import { YouTube } from '@/components/youtube';
import { Screenshot } from '@/components/screenshot';
import { ScreenshotsGallery } from '@/components/screenshots-gallery';
import { SystemPrompts } from '@/components/system-prompts';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    Steps,
    Step,
    ShellCommand: CopyBlock,
    Info,
    Warning,
    Tip,
    YouTube,
    Screenshot,
    ScreenshotsGallery,
    SystemPrompts,
    ...components,
  };
}
