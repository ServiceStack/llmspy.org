import Link from 'next/link';
import Image from 'next/image';
import { CopyBlock } from './copy-block';
import { ConsoleCarousel } from './console-carousel';
import { consoleScreens } from './console-screens';
import { ScreenshotCarousel } from './screenshot-carousel';
import { screenshotScreens } from './screenshot-screens';
import { TabbedImages } from './tabbed-images';
import { LightboxImage } from './lightbox-image';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Star, Sparkles, Zap, Code2, Image as ImageIcon, Music, Calculator, Puzzle, Search, GalleryHorizontal, Sigma } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="mt-8 flex flex-col items-center justify-center min-h-screen">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold tracking-tight">
            <span>llms.py</span>
            <svg className="ml-4 size-14 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
              <path fill="currentColor" d="M8 2.19c3.13 0 5.68 2.25 5.68 5s-2.55 5-5.68 5a5.7 5.7 0 0 1-1.89-.29l-.75-.26l-.56.56a14 14 0 0 1-2 1.55a.13.13 0 0 1-.07 0v-.06a6.58 6.58 0 0 0 .15-4.29a5.25 5.25 0 0 1-.55-2.16c0-2.77 2.55-5 5.68-5M8 .94c-3.83 0-6.93 2.81-6.93 6.27a6.4 6.4 0 0 0 .64 2.64a5.53 5.53 0 0 1-.18 3.48a1.32 1.32 0 0 0 2 1.5a15 15 0 0 0 2.16-1.71a6.8 6.8 0 0 0 2.31.36c3.83 0 6.93-2.81 6.93-6.27S11.83.94 8 .94"></path>
              <ellipse cx="5.2" cy="7.7" fill="currentColor" rx=".8" ry=".75"></ellipse>
              <ellipse cx="8" cy="7.7" fill="currentColor" rx=".8" ry=".75"></ellipse>
              <ellipse cx="10.8" cy="7.7" fill="currentColor" rx=".8" ry=".75"></ellipse>
            </svg>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Lightweight OpenAI compatible CLI, server gateway and OSS Open WebUI alternative
            for Local and Cloud LLMs
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground pt-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-500" />
              <span>530+ Models</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-blue-500" />
              <span>23 Providers</span>
            </div>
            <div className="flex items-center gap-2">
              <Puzzle className="w-4 h-4 text-purple-500" />
              <span>Extensible</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/docs"
            className="px-8 py-3 rounded-lg border-2 border-blue-600 dark:border-blue-500 bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 font-semibold hover:bg-blue-50 dark:hover:bg-blue-950/50 hover:border-blue-700 dark:hover:border-blue-400 transition-all shadow-md hover:shadow-lg"
          >
            Get Started
          </Link>
          <a
            href="https://github.com/ServiceStack/llms"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-background hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-400 dark:hover:border-slate-500 transition-all font-semibold shadow-md hover:shadow-lg"
          >
            <Star className="w-5 h-5" />
            View on GitHub
          </a>
        </div>

        {/* Quick Install */}
        <div className="mt-8 mx-auto max-w-3xl rounded-lg bg-muted p-6">
          <h3 className="font-semibold mb-4 text-slate-900 dark:text-slate-100">Quick Install</h3>
          <CopyBlock>pip install llms</CopyBlock>
        </div>

        {/* Console Carousel Section */}
        <div className="mt-8 w-full px-4">
          <div className="w-full max-w-4xl mx-auto">
            <ConsoleCarousel screens={consoleScreens} />
          </div>
        </div>

        <div className="mt-8 mx-auto max-w-3xl rounded-lg bg-muted p-6">
          <h3 className="font-semibold mb-4 text-slate-900 dark:text-slate-100">Run Server</h3>
          <CopyBlock>llms --serve 8000</CopyBlock>
        </div>
      </div>

      {/* Screenshot Carousel Section */}
      <div className="w-full my-12 px-4">
        <ScreenshotCarousel screens={screenshotScreens} className="max-w-[1200px] mx-auto" />
      </div>

      {/* What's New in v3 */}
      <div className="w-full my-16 px-4 bg-gradient-to-b from-transparent via-blue-50/50 to-transparent dark:via-blue-950/20 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              What's New in v3
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Major release focused on extensibility, expanded provider support, and enhanced user experience
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <Link href="/docs/v3#switch-to-modelsdev-provider-model-configuration" className="block">
              <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
                    <Sparkles className="w-5 h-5 text-yellow-500" />
                    530+ Models from 23 Providers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 dark:text-slate-300">
                    Powered by models.dev integration with automatic daily updates
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/docs/extensions" className="block">
              <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
                    <Puzzle className="w-5 h-5 text-purple-500" />
                    Extensions System
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 dark:text-slate-300">
                    Add features, providers, and customize the UI with flexible plugins
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/docs/extensions/gemini" className="block">
              <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
                    <Search className="w-5 h-5 text-cyan-500" />
                    Gemini File Search
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 dark:text-slate-300">
                    RAG workflows with document stores, categories, and contextual chat
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/docs/extensions/tools" className="block">
              <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
                    <Code2 className="w-5 h-5 text-blue-500" />
                    Tool Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 dark:text-slate-300">
                    First-class Python function calling for LLM interactions with your environment
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/docs/features/calculator-ui" className="block">
              <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
                    <Calculator className="w-5 h-5 text-orange-500" />
                    Calculator & Run Code UIs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 dark:text-slate-300">
                    Beautiful UIs to evaluate math and execute Python, JS, TS & C# code
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/docs/media-generation/media-gallery" className="block">
              <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
                    <GalleryHorizontal className="w-5 h-5 text-indigo-500" />
                    Media Gallery
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 dark:text-slate-300">
                    Browse and manage all your generated images and audio in one place
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/docs/media-generation/image-generation" className="block">
              <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
                    <ImageIcon className="w-5 h-5 text-green-500" />
                    Image Generation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 dark:text-slate-300">
                    Built-in support for Google, OpenAI, OpenRouter, Chutes, and Nvidia
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/docs/media-generation/audio-generation" className="block">
              <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
                    <Music className="w-5 h-5 text-pink-500" />
                    Audio Generation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 dark:text-slate-300">
                    TTS support for Gemini 2.5 Flash/Pro Preview models
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/docs/features/katex" className="block">
              <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
                    <Sigma className="w-5 h-5 text-violet-500" />
                    KaTeX Math Rendering
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 dark:text-slate-300">
                    Beautiful LaTeX math typesetting for equations and formulas
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>

      {/* Model Selector Section */}
      <div className="w-full my-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Powerful Model Selector
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Smart search, advanced filtering, sorting, and favorites system
            </p>
            <Link
              href="/docs/features/model-selector"
              className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline mt-2"
            >
              Learn more →
            </Link>
          </div>
          <div className="rounded-xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700">
            <Image
              src="/img/model-selector.webp"
              alt="Model Selector with search and filtering"
              width={1200}
              height={800}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>

      {/* Gemini File Search Section */}
      <div className="w-full my-16 px-4 bg-gradient-to-b from-transparent via-cyan-50/50 to-transparent dark:via-cyan-950/20 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Gemini File Search & RAG
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Build knowledge bases with document stores and contextual AI chat
            </p>
            <Link
              href="/docs/extensions/gemini"
              className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline mt-2"
            >
              Learn more →
            </Link>
          </div>
          <div className="rounded-xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700 mb-8">
            <Image
              src="/img/gemini-filestores-upload-folder.webp"
              alt="Document Upload with Categories"
              width={1200}
              height={800}
              className="w-full h-auto"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700">
              <LightboxImage
                src="/img/gemini-filestores.webp"
                alt="Filestore Management"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>
            <div className="rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700">
              <LightboxImage
                src="/img/gemini-sync.webp"
                alt="Bidirectional Sync"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700">
              <LightboxImage
                src="/img/gemini-search-all.webp"
                alt="Search All Documents"
                width={400}
                height={300}
                className="w-full h-auto"
              />
            </div>
            <div className="rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700">
              <LightboxImage
                src="/img/gemini-search-category.webp"
                alt="Search by Category"
                width={400}
                height={300}
                className="w-full h-auto"
              />
            </div>
            <div className="rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700">
              <LightboxImage
                src="/img/gemini-search-document.webp"
                alt="Gemini RAG chat with document context"
                width={400}
                height={300}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tools & Function Calling Section */}
      <div className="w-full my-16 px-4 bg-slate-50 dark:bg-slate-900/50 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Tools & Function Calling
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              First-class Python function calling for LLM interactions
            </p>
            <Link
              href="/docs/extensions/tools"
              className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline mt-2"
            >
              Learn more →
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700">
              <LightboxImage
                src="/img/llms-tools-page.webp"
                alt="Tools Page"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>
            <div className="rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700">
              <LightboxImage
                src="/img/llms-tools-top.webp"
                alt="Tool Selector UI"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700">
              <LightboxImage
                src="/img/tool-files.webp"
                alt="File System Tools"
                width={400}
                height={300}
                className="w-full h-auto"
              />
            </div>
            <div className="rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700">
              <LightboxImage
                src="/img/llms-tools-get_current_time.webp"
                alt="Time Tools"
                width={400}
                height={300}
                className="w-full h-auto"
              />
            </div>
            <div className="rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700">
              <LightboxImage
                src="/img/llm-tool-call.webp"
                alt="Tool Call Example"
                width={400}
                height={300}
                className="w-full h-auto"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700 max-h-[500px]">
              <LightboxImage
                src="/img/tool-python.webp"
                alt="Python Code Execution Tool"
                width={500}
                height={500}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700 max-h-[500px]">
              <LightboxImage
                src="/img/tool-javascript.webp"
                alt="JavaScript Code Execution Tool"
                width={500}
                height={500}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700 max-h-[500px]">
              <LightboxImage
                src="/img/tool-csharp.webp"
                alt="C# Code Execution Tool"
                width={500}
                height={500}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Calculator UI Section */}
      <div className="w-full my-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Calculator UI
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Beautiful interface for evaluating Python math expressions
            </p>
            <Link
              href="/docs/features/calculator-ui"
              className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline mt-2"
            >
              Learn more →
            </Link>
          </div>
          <div className="rounded-xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700">
            <Image
              src="/img/run-calc.webp"
              alt="Calculator UI with Python math support"
              width={1200}
              height={800}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>

      {/* Run Code UI Section */}
      <div className="w-full my-16 px-4 bg-slate-50 dark:bg-slate-900/50 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Run Code UI
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Execute Python, JavaScript, TypeScript, and C# code with syntax highlighting
            </p>
            <Link
              href="/docs/features/run-code-ui"
              className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline mt-2"
            >
              Learn more →
            </Link>
          </div>
          <TabbedImages
            tabs={[
              {
                label: 'Python',
                image: '/img/run-python.webp',
                alt: 'Run Python Code with syntax highlighting',
              },
              {
                label: 'JavaScript',
                image: '/img/run-javascript.webp',
                alt: 'Run JavaScript Code with syntax highlighting',
              },
              {
                label: 'TypeScript',
                image: '/img/run-typescript.webp',
                alt: 'Run TypeScript Code with syntax highlighting',
              },
              {
                label: 'C#',
                image: '/img/run-csharp.webp',
                alt: 'Run C# Code with syntax highlighting',
              },
            ]}
          />
        </div>
      </div>

      {/* KaTeX Math Typesetting */}
      <div className="w-full my-16 px-4 bg-gradient-to-b from-transparent via-purple-50/50 to-transparent dark:via-purple-950/20 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              KaTeX Math Typesetting
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Beautiful rendering of LaTeX math expressions
            </p>
            <Link
              href="/docs/features/katex"
              className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline mt-2"
            >
              Learn more →
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700">
              <LightboxImage
                src="/img/rendering-katex.webp"
                alt="Popular math expressions"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>
            <div className="rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700">
              <LightboxImage
                src="/img/rendering-katex2.webp"
                alt="Basic math expressions"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Media Generation Section */}
      <div className="w-full my-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Image & Audio Generation
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Seamless media generation through UI and CLI
            </p>
            <div className="flex items-center justify-center gap-4 mt-2">
              <Link
                href="/docs/media-generation/image-generation"
                className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline"
              >
                Image Generation →
              </Link>
              <Link
                href="/docs/media-generation/audio-generation"
                className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline"
              >
                Audio Generation →
              </Link>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700">
              <LightboxImage
                src="/img/generate-image.webp"
                alt="Image Generation with aspect ratio selection"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>
            <div className="rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700">
              <LightboxImage
                src="/img/generate-audio.webp"
                alt="Audio Generation with TTS"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Media Gallery Section */}
      <div className="w-full my-16 px-4 bg-slate-50 dark:bg-slate-900/50 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Media Gallery
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Beautiful UI to browse all your generated images and audio
            </p>
            <Link
              href="/docs/media-generation/media-gallery"
              className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline mt-2"
            >
              Learn more →
            </Link>
          </div>
          <div className="space-y-6">
            <div className="rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700">
              <Image
                src="/img/gallery-portrait.webp"
                alt="Portrait Images Gallery"
                width={1200}
                height={600}
                className="w-full h-auto"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700">
                <Image
                  src="/img/gallery-square.webp"
                  alt="Square Images Gallery"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
              <div className="rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700">
                <Image
                  src="/img/gallery-landscape.webp"
                  alt="Landscape Images Gallery"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </div>
            <div className="rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700">
              <Image
                src="/img/gallery-audio.webp"
                alt="Audio Generations Gallery"
                width={1200}
                height={600}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* System Prompts Section */}
      <div className="w-full my-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              System Prompts Library
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              200+ curated system prompts for every use case
            </p>
            <Link
              href="/docs/features/system-prompts"
              className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline mt-2"
            >
              Learn more →
            </Link>
          </div>
          <div className="rounded-xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700">
            <Image
              src="/img/llms-system-prompt.webp"
              alt="System Prompts Library"
              width={1200}
              height={800}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>

      {/* Provider Management Section */}
      <div className="w-full my-16 px-4 bg-gradient-to-b from-transparent via-slate-50/50 to-transparent dark:via-slate-900/50 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Runtime Provider Management
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Enable or disable providers on the fly without configuration changes
            </p>
            <Link
              href="/docs/configuration"
              className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline mt-2"
            >
              Learn more →
            </Link>
          </div>
          <div className="rounded-xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700">
            <Image
              src="/img/model-selector-providers.webp"
              alt="Provider management interface"
              width={1200}
              height={800}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>

      {/* Getting Started Call-out */}
      <div className="w-full my-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-8 text-center shadow-lg dark:shadow-blue-900/20">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">
              Ready to Get Started?
            </h3>
            <p className="text-slate-700 dark:text-slate-300 mb-6 text-lg">
              Install llms.py and start chatting with 530+ AI models in minutes
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/docs"
                className="px-8 py-3 rounded-lg bg-blue-600 dark:bg-blue-600 text-white font-semibold hover:bg-blue-700 dark:hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
              >
                View Documentation
              </Link>
              <a
                href="https://github.com/ServiceStack/llms"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-lg border-2 border-blue-600 dark:border-blue-500 bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors font-semibold shadow-md hover:shadow-lg"
              >
                <Star className="w-5 h-5" />
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
