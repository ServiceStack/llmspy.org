import type { MDXComponents } from 'mdx/types';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { Steps, Step } from 'fumadocs-ui/components/steps';
import { CopyBlock } from '@/app/(home)/copy-block';
import { Info } from '@/components/info';
import { Tip } from '@/components/tip';
import { YouTube } from '@/components/youtube';
import { ScreenshotsGallery } from '@/components/screenshots-gallery';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    Steps,
    Step,
    ShellCommand: CopyBlock,
    Info,
    Tip,
    YouTube,
    ScreenshotsGallery,
    ...components,
  };
}
