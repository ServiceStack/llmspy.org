import Link from 'next/link';
import Image from 'next/image';
import { CopyBlock } from './copy-block';
import { ConsoleCarousel } from './console-carousel';
import { consoleScreens } from './console-screens';
import { ScreenshotCarousel } from './screenshot-carousel';
import { screenshotScreens } from './screenshot-screens';
import { TabbedImages } from './tabbed-images';
import { LightboxImage } from './lightbox-image';
import { ThemeCarousel } from './theme-carousel';
import { ScreenshotTabs } from '@/components/screenshot-tabs';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Star, Sparkles, Code2, Image as ImageIcon, Music, Calculator, Puzzle, Search, GalleryHorizontal, Sigma, Plug, Wand2, Mic, Palette, ShieldCheck, Bot, FolderOpen, Server, MessageSquare, Check, Globe, Gamepad2, FileText } from 'lucide-react';
import { YouTube } from '@/components/youtube';

export default function HomePage() {
  return (
    <main className="mt-8 flex flex-col items-center justify-center min-h-screen">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto text-center space-y-8 px-4">
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
            The self-hosted, OpenAI-compatible AI gateway for <span className="text-slate-900 dark:text-slate-100 font-semibold">text, image &amp; audio</span>
            {' '}- a lightweight CLI, server and OSS Open WebUI alternative for Local and Cloud LLMs
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/docs"
            className="px-8 py-3 rounded-lg border-2 border-blue-600 dark:border-blue-500 bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 font-semibold hover:bg-blue-50 dark:hover:bg-blue-950/50 hover:border-blue-700 dark:hover:border-blue-400 transition-all shadow-md hover:shadow-lg"
          >
            View the Docs
          </Link>
          <a
            href="https://ai.llmspy.org/m"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-blue-600 dark:bg-blue-600 text-white font-semibold hover:bg-blue-700 dark:hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
          >
            <Globe className="w-5 h-5" />
            Explore the Gallery
          </a>
          <a
            href="https://github.com/ServiceStack/llms"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-background hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-400 dark:hover:border-slate-500 transition-all font-semibold shadow-md hover:shadow-lg"
          >
            <Star className="w-5 h-5" />
            View on GitHub
          </a>
        </div>
        <p className="text-sm text-muted-foreground">
          <span className="text-slate-400 dark:text-slate-500">October 6, 2026</span>
          {' - '}
          <Link href="/docs/latest" className="text-blue-600 dark:text-blue-400 hover:underline">
            v4 Released! →
          </Link>
        </p>

        {/* Hero Poster */}
        <div className="pt-4">
          <Link href="/docs/latest" className="block">
            <Image
              src="/img/latest/llmspy-v4.webp"
              alt="llms.py v4 - Text, Image, Audio, Speech & Projects"
              width={1376}
              height={768}
              priority
              className="mx-auto w-full max-w-4xl h-auto rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xl"
            />
          </Link>
        </div>
      </div>

      {/* Stats Band */}
      <div className="w-full mt-12 px-4 border-y border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
        <div className="max-w-6xl mx-auto py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl sm:text-5xl font-black text-blue-600 dark:text-blue-400">530+</div>
            <div className="mt-1 text-sm font-medium text-slate-600 dark:text-slate-400">Models</div>
          </div>
          <div className="text-center">
            <div className="text-4xl sm:text-5xl font-black text-blue-600 dark:text-blue-400">24</div>
            <div className="mt-1 text-sm font-medium text-slate-600 dark:text-slate-400">Providers</div>
          </div>
          <div className="text-center">
            <div className="text-4xl sm:text-5xl font-black text-blue-600 dark:text-blue-400">3</div>
            <div className="mt-1 text-sm font-medium text-slate-600 dark:text-slate-400">Modalities · Text · Image · Audio</div>
          </div>
          <div className="text-center">
            <div className="text-4xl sm:text-5xl font-black text-blue-600 dark:text-blue-400">100%</div>
            <div className="mt-1 text-sm font-medium text-slate-600 dark:text-slate-400">Open Source &amp; Self-Hosted</div>
          </div>
        </div>
      </div>

      {/* Generate Anything Section */}
      <div id="generate" className="w-full mt-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-sm font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">One tool, every modality</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Generate Anything
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              From a single self-hosted gateway - chat with 530+ models, create images, and synthesize speech across 24 providers
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/docs/features/chat-ui" className="block">
              <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-pointer h-full">
                <CardHeader>
                  <div className="flex size-11 items-center justify-center rounded-xl bg-blue-500/15 text-blue-500">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <CardTitle className="mt-3 text-slate-900 dark:text-slate-100">Text &amp; Chat</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 dark:text-slate-300">
                    A fast, private, ChatGPT-like web UI over every local &amp; cloud LLM - with tools, MCP, skills, agents and 200+ system prompts
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/docs/media-generation/image-generation" className="block">
              <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-pointer h-full">
                <CardHeader>
                  <div className="flex size-11 items-center justify-center rounded-xl bg-pink-500/15 text-pink-500">
                    <ImageIcon className="w-5 h-5" />
                  </div>
                  <CardTitle className="mt-3 text-slate-900 dark:text-slate-100">Image Generation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 dark:text-slate-300">
                    Create images via Gemini, OpenAI, OpenRouter, Chutes, Z.ai &amp; Nvidia - right inside the chat and gallery workflow
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/docs/media-generation/audio-generation" className="block">
              <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-pointer h-full">
                <CardHeader>
                  <div className="flex size-11 items-center justify-center rounded-xl bg-violet-500/15 text-violet-500">
                    <Music className="w-5 h-5" />
                  </div>
                  <CardTitle className="mt-3 text-slate-900 dark:text-slate-100">Audio &amp; Speech</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 dark:text-slate-300">
                    High-quality text-to-speech with Gemini &amp; OpenRouter models, plus voice-to-text input via the microphone
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>

      {/* Publish & Public Gallery Section */}
      <div id="public-gallery" className="w-full my-16 px-4 bg-gradient-to-b from-transparent via-blue-50/50 to-transparent dark:via-blue-950/20 py-16">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">Create → Publish → Showcase</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Your Creations, in the Public Gallery
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Anything you generate in llms.py can be published with one click - landing in the live
              showcase at{' '}
              <a href="https://ai.llmspy.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                ai.llmspy.org
              </a>, browsable by everyone with categories, tags, ratings and infinite scroll.
            </p>
            <ul className="mt-6 space-y-3 text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 mt-0.5 text-emerald-500 shrink-0" />
                Browse generated images &amp; audio by category and tag
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 mt-0.5 text-emerald-500 shrink-0" />
                Play full <Link href="#projects-built" className="text-blue-600 dark:text-blue-400 hover:underline">Projects built by AI</Link> - games and apps, ready to run
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 mt-0.5 text-emerald-500 shrink-0" />
                Free &amp; anonymous publisher account - no email required
              </li>
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://ai.llmspy.org/m"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
              >
                <Globe className="w-5 h-5" />
                Explore the Gallery
              </a>
              <Link
                href="/docs/features/publishing"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-background hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-400 dark:hover:border-slate-500 transition-colors font-semibold"
              >
                Learn more →
              </Link>
            </div>
          </div>
          <ScreenshotTabs
            alt="ai.llmspy.org Public Gallery"
            href="https://ai.llmspy.org/m"
            className="not-prose"
            images={{
              Images: '/img/publish/gallery-images.webp',
              Audio: '/img/publish/gallery-audio.webp',
              Projects: '/img/publish/gallery-projects.webp',
            }}
          />
        </div>
      </div>

      {/* Projects Built by AI Section */}
      <div id="projects-built" className="w-full my-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-sm font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">Playable &amp; self-contained</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Projects Built by AI
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Complete, self-contained apps &amp; games - generated with llms.py and published for anyone to open and play
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Space Blocks', desc: 'Space themed Tetris with power ups', img: '/img/publish/games/Space_Blocks.webp' },
              { name: 'Breakout', desc: 'Stunning sci-fi breakout game', img: '/img/publish/games/Breakout.webp' },
              { name: '2048', desc: 'Neon 2048 Arcade game', img: '/img/publish/games/2048.webp' },
              { name: 'Pac_Man', label: 'Pac Man', desc: 'Stunning Sci-Fi Pacman', img: '/img/publish/games/Pac_Man.webp' },
              { name: 'Asteroids', desc: 'The classic Asteroids game', img: '/img/publish/games/Asteroids.webp' },
              { name: 'Pong', desc: 'Sci-Fi Neon Pong', img: '/img/publish/games/Pong.webp' },
            ].map((game) => (
              <a
                key={game.name}
                href={`https://ai.llmspy.org/p/llmspy/${game.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl hover:border-blue-400 dark:hover:border-blue-500 transition-all"
              >
                <div className="relative">
                  <img
                    src={game.img}
                    alt={game.label ?? game.name}
                    loading="lazy"
                    className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <h3 className="text-white font-bold flex items-center gap-2">
                      <Gamepad2 className="w-4 h-4" />
                      {game.label ?? game.name}
                    </h3>
                    <p className="text-slate-200 text-sm">{game.desc}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
          <div className="text-center mt-10">
            <a
              href="https://ai.llmspy.org/m#projects"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline font-semibold"
            >
              Browse all projects →
            </a>
          </div>
        </div>
      </div>

      {/* Quick Install */}
      <div className="mt-8 w-full px-4">
        <div className="max-w-3xl mx-auto rounded-lg bg-muted p-6">
          <h3 className="font-semibold mb-4 text-center text-slate-900 dark:text-slate-100">Quick Install</h3>
          <CopyBlock>pip install llms-py</CopyBlock>
        </div>
      </div>

      {/* Console Carousel Section */}
      <div className="mt-8 w-full px-4">
        <div className="w-full max-w-4xl mx-auto">
          <ConsoleCarousel screens={consoleScreens} />
        </div>
      </div>

      <div className="mt-8 mb-8 w-full px-4">
        <div className="max-w-3xl mx-auto rounded-lg bg-muted p-6">
          <h3 className="font-semibold mb-4 text-center text-slate-900 dark:text-slate-100">Run Server</h3>
          <CopyBlock>llms --serve 8000</CopyBlock>
        </div>
      </div>

      {/* Themes Section */}
      <div id="themes" className="w-full my-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Beautiful Themes
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Personalize your experience with a selection of 
              <a href="/docs/features/themes" className="text-blue-600 dark:text-blue-400 hover:underline mx-1">
                handcrafted themes
              </a>
            </p>
          </div>
          <ThemeCarousel />
        </div>
      </div>

      {/* Screenshot Carousel Section */}
      <div className="w-full my-12 px-4">
        <ScreenshotCarousel screens={screenshotScreens} className="max-w-[1200px] mx-auto" />
      </div>

      {/* What's New */}
      <div id="whatsnew" className="w-full my-16 px-4 bg-gradient-to-b from-transparent via-blue-50/50 to-transparent dark:via-blue-950/20 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              What's New
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Latest release focused on extensibility, expanded provider support, and enhanced user experience
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <Link href="/docs/v3#switch-to-modelsdev-provider-model-configuration" className="block">
              <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
                    <Sparkles className="w-5 h-5 text-yellow-500" />
                    530+ Models from 24 Providers
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

            <Link href="/docs/authentication/credentials" className="block">
              <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
                    <ShieldCheck className="w-5 h-5 text-emerald-500" />
                    Credentials Auth
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 dark:text-slate-300">
                    Username/Password authentication with Admin UI and CLI user management
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/docs/features/agents" className="block">
              <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
                    <Bot className="w-5 h-5 text-violet-500" />
                    Agent Profiles
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 dark:text-slate-300">
                    Specialized AI agents with custom prompts, tools, themes, and Planner→Coder workflows
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/docs/features/projects" className="block">
              <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
                    <FolderOpen className="w-5 h-5 text-amber-500" />
                    Projects
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 dark:text-slate-300">
                    Secure workspace isolation that restricts AI agent filesystem access to designated project folders
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/docs/features/pdf" className="block">
              <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
                    <FileText className="w-5 h-5 text-rose-500" />
                    PDF Studio
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 dark:text-slate-300">
                    Design pixel-identical PDFs using Typst templates, real-time live preview, schema-driven forms, and AI assistance
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

            <Link href="/docs/features/server-tools" className="block">
              <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
                    <Server className="w-5 h-5 text-sky-500" />
                    Server Tools
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 dark:text-slate-300">
                    Built-in support for provider hosted Anthropic & OpenRouter server tools like web search
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/docs/mcp/fast_mcp" className="block">
              <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
                    <Plug className="w-5 h-5 text-teal-500" />
                    MCP Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 dark:text-slate-300">
                    Connect to Model Context Protocol servers for extended tool capabilities
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/docs/extensions/skills" className="block">
              <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
                    <Wand2 className="w-5 h-5 text-pink-500" />
                    Skills Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 dark:text-slate-300">
                    Extend AI capabilities with specialized knowledge, workflows, and tools
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/docs/features/themes" className="block">
              <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
                    <Palette className="w-5 h-5 text-violet-500" />
                    Themes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 dark:text-slate-300">
                    Customize the look and feel with built-in themes or create your own
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

            <Link href="/docs/features/voice-input" className="block">
              <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
                    <Mic className="w-5 h-5 text-red-500" />
                    Voice Input
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 dark:text-slate-300">
                    Voice-to-text transcription via microphone button or ALT+D keyboard shortcut
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
                    Built-in support for Gemini, OpenAI, OpenRouter, Chutes, Z.ai and Nvidia
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
      <div id="model-selector" className="w-full my-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Model Selector
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Smart search, advanced filtering, sorting, and favorites over 530 models from 24 providers
            </p>
            <Link
              href="/docs/features/model-selector"
              className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline mt-2"
            >
              Learn more →
            </Link>
          </div>
          <div className="rounded-xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700 dark:bg-white">
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

      {/* Credentials Auth Section */}
      <div id="credentials-auth" className="w-full my-16 px-4 bg-gradient-to-b from-transparent via-emerald-50/50 to-transparent dark:via-emerald-950/20 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              <ShieldCheck className="w-8 h-8 inline-block mr-2 text-emerald-500" />
              Credentials Auth
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Built-in Username/Password authentication with a Sign In page, Admin Web UI and CLI for user managing accounts, roles, and account locking
            </p>
            <Link
              href="/docs/authentication/credentials"
              className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline mt-2"
            >
              Learn more →
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700 dark:bg-white">
              <LightboxImage
                src="/img/auth/signin.webp"
                alt="Sign In Page"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>
            <div className="rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700 dark:bg-white">
              <LightboxImage
                src="/img/auth/manage-users.webp"
                alt="Manage Users"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700 dark:bg-white">
              <LightboxImage
                src="/img/auth/create-user.webp"
                alt="Create User"
                width={400}
                height={300}
                className="w-full h-auto"
              />
            </div>
            <div className="rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700 dark:bg-white">
              <LightboxImage
                src="/img/auth/my-account-avatar.webp"
                alt="My Account"
                width={400}
                height={300}
                className="w-full h-auto"
              />
            </div>
            <div className="rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700 dark:bg-white">
              <LightboxImage
                src="/img/auth/lock-user.webp"
                alt="Lock User"
                width={400}
                height={300}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Agents & Projects Section */}
      <div id="agents-projects" className="w-full my-16 px-4 bg-gradient-to-b from-transparent via-violet-50/50 to-transparent dark:via-violet-950/20 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Agent Profiles &amp; Projects
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Configure specialized AI agents with custom prompts, tools, and themes - and scope their filesystem access to secure project workspaces
            </p>
            <div className="flex items-center justify-center gap-4 mt-2">
              <Link href="/docs/features/agents" className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline">
                Agent Profiles →
              </Link>
              <Link href="/docs/features/projects" className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline">
                Projects →
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700 dark:bg-white">
              <LightboxImage
                src="/img/profiles/profiles-ubi.webp"
                alt="Ubi Personal Assistant Agent Profile"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>
            <div className="rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700 dark:bg-white">
              <LightboxImage
                src="/img/projects/projects-editor.webp"
                alt="Projects Editor"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700 dark:bg-white">
              <LightboxImage
                src="/img/profiles/profiles-menu.webp"
                alt="Agent Profile Selector"
                width={400}
                height={300}
                className="w-full h-auto"
              />
            </div>
            <div className="rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700 dark:bg-white">
              <LightboxImage
                src="/img/profiles/profiles-planner.webp"
                alt="Planner Agent Profile"
                width={400}
                height={300}
                className="w-full h-auto"
              />
            </div>
            <div className="rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700 dark:bg-white">
              <LightboxImage
                src="/img/profiles/profiles-coder.webp"
                alt="Coder Agent Profile"
                width={400}
                height={300}
                className="w-full h-auto"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700 dark:bg-white">
              <LightboxImage
                src="/img/projects/projects-menu.webp"
                alt="Projects Menu"
                width={400}
                height={300}
                className="w-full h-auto"
              />
            </div>
            <div className="rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700 dark:bg-white">
              <LightboxImage
                src="/img/publish/games/2048_2076x1850.webp"
                alt="2048 Game - built by Coder agent"
                width={400}
                height={300}
                className="w-full h-auto"
              />
            </div>
            <div className="rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700 dark:bg-white">
              <LightboxImage
                src="/img/publish/games/Breakout_2076x1850.webp"
                alt="Breakout - Gameplay built by Coder agent"
                width={400}
                height={300}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* PDF Studio Section */}
      <div id="pdf-designer" className="w-full my-16 px-4 bg-gradient-to-b from-transparent via-rose-50/50 to-transparent dark:via-rose-950/20 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              PDF Studio
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Design pixel-identical PDFs using Typst templates, real-time live preview, schema-driven forms, typed code generation, and AI assistance
            </p>
            <div className="flex items-center justify-center gap-4 mt-2">
              <Link href="/docs/features/pdf" className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline">
                PDF Studio Docs →
              </Link>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700 dark:bg-white mb-8">
            <Image
              src="/img/pdf/designer-overview.webp"
              alt="PDF Studio Overview"
              width={1200}
              height={800}
              className="w-full h-auto"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700 dark:bg-white">
              <LightboxImage
                src="/img/pdf/data-form.webp"
                alt="Form View of Data"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>
            <div className="rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700 dark:bg-white">
              <LightboxImage
                src="/img/pdf/edit-with-ai-after.webp"
                alt="Edit with AI Panel"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700 dark:bg-white">
              <LightboxImage
                src="/img/pdf/font-picker.webp"
                alt="Font and Typography Picker"
                width={400}
                height={300}
                className="w-full h-auto"
              />
            </div>
            <div className="rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700 dark:bg-white">
              <LightboxImage
                src="/img/pdf/page-setup.webp"
                alt="Page Setup Dialog"
                width={400}
                height={300}
                className="w-full h-auto"
              />
            </div>
            <div className="rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700 dark:bg-white">
              <LightboxImage
                src="/img/pdf/generated-types-csharp.webp"
                alt="Typed Application Code Generation"
                width={400}
                height={300}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Gemini RAG Section */}
      <section id="rag" className="relative isolate w-full my-20 overflow-hidden border-y border-cyan-100/80 bg-gradient-to-b from-white via-cyan-50/70 to-blue-50/40 px-4 py-20 dark:border-cyan-950 dark:from-slate-950 dark:via-cyan-950/25 dark:to-blue-950/20">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
          <div className="absolute left-[-8rem] top-28 size-80 rounded-full bg-cyan-300/20 blur-3xl dark:bg-cyan-500/10" />
          <div className="absolute right-[-10rem] top-1/3 size-96 rounded-full bg-blue-300/20 blur-3xl dark:bg-blue-500/10" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
        </div>

        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-white/80 px-4 py-1.5 text-sm font-bold text-cyan-700 shadow-sm backdrop-blur dark:border-cyan-800 dark:bg-slate-900/70 dark:text-cyan-300">
              <Sparkles className="size-4" />
              Gemini-powered knowledge, from source to answer
            </div>
            <h2 className="mt-5 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl dark:text-white">
              Turn your content into a trusted AI Assistant
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-slate-600 sm:text-xl dark:text-slate-300">
              Ingest files, repositories, and websites into managed Gemini File Stores. Curate the
              exact knowledge each answer can use, verify every citation, then publish a beautiful
              support Assistant anywhere with one script tag.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/docs/extensions/gemini"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-600 px-6 py-3 font-bold text-white shadow-lg shadow-cyan-600/20 transition-all hover:bg-cyan-700 hover:shadow-xl hover:shadow-cyan-600/25 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400"
              >
                Explore Gemini RAG
                <span aria-hidden="true">→</span>
              </Link>
              <a
                href="#gemini-workflow"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white/80 px-6 py-3 font-semibold text-slate-700 shadow-sm backdrop-blur transition-colors hover:border-cyan-400 hover:text-cyan-700 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:border-cyan-600 dark:hover:text-cyan-300"
              >
                See the workflow
              </a>
            </div>
          </div>

          <div className="relative mx-auto mt-14 max-w-6xl">
            <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-r from-cyan-400/20 via-blue-400/15 to-violet-400/20 blur-2xl dark:from-cyan-500/10 dark:via-blue-500/10 dark:to-violet-500/10" />
            <div className="overflow-hidden rounded-[1.75rem] border border-white/80 bg-white/80 p-2 shadow-[0_30px_90px_-35px_rgba(8,145,178,0.55)] backdrop-blur dark:border-slate-700/80 dark:bg-slate-900/80 dark:shadow-[0_30px_90px_-35px_rgba(34,211,238,0.25)]">
              <LightboxImage
                src="/img/gemini/gemini-02-filestore.webp"
                alt="Gemini RAG File Store with Explore, Import and Assistants workspaces"
                width={1600}
                height={900}
                className="h-auto w-full rounded-[1.25rem]"
              />
            </div>
            <div className="absolute -bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-cyan-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-lg dark:border-cyan-800 dark:bg-slate-900 dark:text-slate-200">
              <span className="size-2 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.12)]" />
              One workspace for documents, imports, and Assistants
            </div>
          </div>

          <div className="mt-20 grid gap-5 md:grid-cols-3">
            {[
              {
                icon: FolderOpen,
                color: 'text-cyan-600 dark:text-cyan-300',
                iconBg: 'bg-cyan-500/10',
                title: 'Curate every source',
                text: 'Upload files and ZIPs, sync folders, or crawl websites into inspectable Markdown before indexing.',
              },
              {
                icon: Search,
                color: 'text-blue-600 dark:text-blue-300',
                iconBg: 'bg-blue-500/10',
                title: 'Retrieve precisely',
                text: 'Scope Gemini by category, type, status, locale, product, version, tags, or a single document.',
              },
              {
                icon: Bot,
                color: 'text-violet-600 dark:text-violet-300',
                iconBg: 'bg-violet-500/10',
                title: 'Publish with confidence',
                text: 'Ship a branded, citation-backed Website Assistant and review real customer conversations.',
              },
            ].map(({ icon: Icon, color, iconBg, title, text }) => (
              <div key={title} className="rounded-2xl border border-slate-200/80 bg-white/75 p-6 shadow-sm backdrop-blur transition-all hover:-translate-y-1 hover:border-cyan-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/65 dark:hover:border-cyan-800">
                <div className={`flex size-11 items-center justify-center rounded-xl ${iconBg} ${color}`}>
                  <Icon className="size-5" />
                </div>
                <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">{title}</h3>
                <p className="mt-2 leading-relaxed text-slate-600 dark:text-slate-400">{text}</p>
              </div>
            ))}
          </div>

          <div id="gemini-workflow" className="mt-20 space-y-16 scroll-mt-24">
            <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">01 · Ingest &amp; refine</p>
                <h3 className="mt-3 text-3xl font-black tracking-tight text-slate-900 dark:text-white">A clean knowledge pipeline, not a black box</h3>
                <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                  Preview folder changes before committing, save repeatable imports, and monitor every
                  upload. The web crawler stages pages as Markdown so you can inspect and transform
                  extracted content before Gemini ever sees it.
                </p>
                <ul className="mt-6 space-y-3 text-slate-700 dark:text-slate-300">
                  {['Files, ZIP archives, folders, and websites', 'Diff previews and recurring import.json rules', 'Resumable background uploads with live progress'].map(item => (
                    <li key={item} className="flex items-start gap-3">
                      <Check className="mt-0.5 size-5 shrink-0 text-emerald-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                {[
                  { src: '/img/gemini/gemini-25-import-folder-preview.webp', alt: 'Preview a recurring folder import', label: 'Preview every change' },
                  { src: '/img/gemini/gemini-07-import-web-crawl-view-pages.webp', alt: 'Inspect pages extracted by the web crawler', label: 'Inspect crawled Markdown' },
                  { src: '/img/gemini/gemini-26-import-folder-uploading.webp', alt: 'Monitor Gemini document upload progress', label: 'Watch uploads live' },
                  { src: '/img/gemini/gemini-05-import-web-crawl-transforms.webp', alt: 'Define reusable web crawl transformations', label: 'Clean content with rules' },
                ].map(image => (
                  <figure key={image.src} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:bg-slate-900">
                    <LightboxImage src={image.src} alt={image.alt} width={800} height={450} className="aspect-video w-full object-cover" />
                    <figcaption className="border-t border-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 dark:border-slate-800 dark:text-slate-200">{image.label}</figcaption>
                  </figure>
                ))}
              </div>
            </div>

            <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="order-2 grid gap-5 sm:grid-cols-2 lg:order-1">
                <figure className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl sm:col-span-2 dark:border-slate-700 dark:bg-slate-900">
                  <LightboxImage src="/img/gemini/gemini-29-chat-ask-sources.webp" alt="Grounded Gemini answer with cited source evidence" width={1600} height={900} className="aspect-video w-full object-cover" />
                  <figcaption className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 px-5 py-3 dark:border-slate-800">
                    <span className="font-semibold text-slate-800 dark:text-slate-100">Answers backed by inspectable evidence</span>
                    <span className="text-sm text-cyan-700 dark:text-cyan-300">Inline citations · Source excerpts · Canonical links</span>
                  </figcaption>
                </figure>
                <figure className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:bg-slate-900">
                  <LightboxImage src="/img/gemini/gemini-30-explore-filters.webp" alt="Filter Gemini documents by metadata" width={800} height={450} className="aspect-video w-full object-cover" />
                  <figcaption className="border-t border-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 dark:border-slate-800 dark:text-slate-200">Build precise document scopes</figcaption>
                </figure>
                <figure className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:bg-slate-900">
                  <LightboxImage src="/img/gemini/gemini-21-filestore-sync.webp" alt="Reconcile local documents with the Gemini File Store" width={800} height={450} className="aspect-video w-full object-cover" />
                  <figcaption className="border-t border-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 dark:border-slate-800 dark:text-slate-200">Audit coverage and sync state</figcaption>
                </figure>
              </div>
              <div className="order-1 lg:order-2">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">02 · Ask with evidence</p>
                <h3 className="mt-3 text-3xl font-black tracking-tight text-slate-900 dark:text-white">The right answer from exactly the right documents</h3>
                <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                  Browse by category, compose metadata filters, and carry that precise scope into a
                  grounded Gemini chat. Every response can surface the retrieved evidence and link
                  readers back to the original source.
                </p>
                <div className="mt-6 rounded-2xl border border-blue-200/70 bg-blue-50/70 p-5 dark:border-blue-900 dark:bg-blue-950/30">
                  <div className="flex items-center gap-3 font-bold text-blue-900 dark:text-blue-100">
                    <ShieldCheck className="size-5 text-blue-600 dark:text-blue-400" />
                    Retrieval scope stays visible
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-blue-800/80 dark:text-blue-200/75">
                    Categories appear as paths and additional filters remain inspectable, so users
                    always know which knowledge shaped the answer.
                  </p>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-violet-200/80 bg-gradient-to-br from-white via-violet-50/80 to-pink-50/70 p-6 shadow-xl sm:p-10 dark:border-violet-900/70 dark:from-slate-900 dark:via-violet-950/35 dark:to-pink-950/20">
              <div className="grid items-center gap-10 lg:grid-cols-[0.78fr_1.22fr]">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">03 · Design &amp; publish</p>
                  <h3 className="mt-3 text-3xl font-black tracking-tight text-slate-900 dark:text-white">Your own support Assistant, beautifully on-brand</h3>
                  <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                    Choose a behavior template, system prompt, Gemini model, document scope, opening
                    behavior, and suggested questions. Then style every surface and launcher color
                    before publishing the self-contained Shadow DOM widget with one script tag.
                  </p>
                  <div className="mt-7 grid grid-cols-2 gap-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
                    {['6 theme presets', 'Custom CSS colors', 'Origin allowlists', 'Conversation review'].map(item => (
                      <div key={item} className="flex items-center gap-2 rounded-xl border border-white/80 bg-white/65 px-3 py-2.5 shadow-sm dark:border-slate-700 dark:bg-slate-900/60">
                        <Check className="size-4 shrink-0 text-violet-500" />
                        {item}
                      </div>
                    ))}
                  </div>
                  <Link href="/docs/extensions/gemini#publish-a-website-assistant" className="mt-8 inline-flex items-center gap-2 font-bold text-violet-700 hover:text-violet-900 dark:text-violet-300 dark:hover:text-violet-100">
                    Design a Website Assistant <span aria-hidden="true">→</span>
                  </Link>
                </div>
                <figure className="overflow-hidden rounded-2xl border border-white/80 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900">
                  <LightboxImage src="/img/gemini/gemini-47-assistant-appearance-softpink.webp" alt="Design a Soft Pink Gemini Website Assistant with live preview" width={1600} height={900} className="aspect-video w-full object-cover" />
                  <figcaption className="flex items-center justify-between gap-3 border-t border-slate-100 px-5 py-3 text-sm dark:border-slate-800">
                    <span className="font-semibold text-slate-800 dark:text-slate-100">Live preview matches the real widget</span>
                    <span className="text-violet-600 dark:text-violet-300">Soft Pink</span>
                  </figcaption>
                </figure>
              </div>

              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { src: '/img/gemini/gemini-42-assistant-behavior.webp', alt: 'Configure Gemini Assistant behavior and prompting', label: 'Behavior templates' },
                  { src: '/img/gemini/gemini-43-assistant-document.webp', alt: 'Choose the Gemini Assistant document scope', label: 'Server-enforced scope' },
                  { src: '/img/gemini/gemini-12-assistant-appearance-matrix.webp', alt: 'Matrix theme for a Gemini Website Assistant', label: 'Theme presets' },
                  { src: '/img/gemini/gemini-50-assistant-publish.webp', alt: 'Publish and embed a Gemini Website Assistant', label: 'Publish & embed' },
                ].map(image => (
                  <figure key={image.src} className="overflow-hidden rounded-xl border border-white/80 bg-white/85 shadow-md transition-transform hover:-translate-y-1 dark:border-slate-700 dark:bg-slate-900/80">
                    <LightboxImage src={image.src} alt={image.alt} width={600} height={338} className="aspect-video w-full object-cover" />
                    <figcaption className="border-t border-slate-100 px-3 py-2.5 text-xs font-bold text-slate-700 dark:border-slate-800 dark:text-slate-200">{image.label}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-14 flex flex-col items-center justify-between gap-5 rounded-2xl border border-cyan-200/80 bg-white/75 px-6 py-6 shadow-sm backdrop-blur sm:flex-row dark:border-cyan-900 dark:bg-slate-900/70">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Ready to ground Gemini in your own knowledge?</h3>
              <p className="mt-1 text-slate-600 dark:text-slate-400">Install the extension, create a File Store, and ask your first citation-backed question.</p>
            </div>
            <Link href="/docs/extensions/gemini" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 font-bold text-white transition-colors hover:bg-cyan-700 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400">
              Read the Gemini RAG guide <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Tools & Function Calling Section */}
      <div id="tools" className="w-full my-16 px-4 bg-slate-50 dark:bg-slate-900/50 py-16">
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
            <div className="rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700 dark:bg-white">
              <LightboxImage
                src="/img/llms-tools-page.webp"
                alt="Tools Page"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>
            <div className="rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700 dark:bg-white">
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
            <div className="rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700 dark:bg-white">
              <LightboxImage
                src="/img/tools/tool-files.webp"
                alt="File System Tools"
                width={400}
                height={300}
                className="w-full h-auto"
              />
            </div>
            <div className="rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700 dark:bg-white">
              <LightboxImage
                src="/img/llms-tools-get_current_time.webp"
                alt="Time Tools"
                width={400}
                height={300}
                className="w-full h-auto"
              />
            </div>
            <div className="rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700 dark:bg-white">
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
            <div className="rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700 dark:bg-white max-h-[500px]">
              <LightboxImage
                src="/img/tools/tool-python.webp"
                alt="Python Code Execution Tool"
                width={500}
                height={500}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700 dark:bg-white max-h-[500px]">
              <LightboxImage
                src="/img/tools/tool-javascript.webp"
                alt="JavaScript Code Execution Tool"
                width={500}
                height={500}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700 dark:bg-white max-h-[500px]">
              <LightboxImage
                src="/img/tools/tool-csharp.webp"
                alt="C# Code Execution Tool"
                width={500}
                height={500}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="text-center mt-16 mb-8">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Server Tools
            </h3>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Built-in support for provider-hosted OpenRouter & Anthropic server tools like web search, web fetch &amp; code execution
            </p>
            <Link
              href="/docs/features/server-tools"
              className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline mt-2"
            >
              Learn more →
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700 dark:bg-white">
              <LightboxImage
                src="/img/tools/tools_selector_server.webp"
                alt="Server Tools Selector Tab"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>
            <div className="rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700 dark:bg-white">
              <LightboxImage
                src="/img/tools/tools_selector_server_config.webp"
                alt="Configure Server Tool"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* MCP Support Section */}
      <div id="mcp" className="w-full my-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              MCP Support
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Extend LLM capabilities with Model Context Protocol servers
            </p>
            <Link
              href="/docs/mcp/fast_mcp"
              className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline mt-2"
            >
              Learn more →
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700 dark:bg-white">
              <LightboxImage
                src="/img/mcp-servers.webp"
                alt="MCP Servers with registered tools"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>
            <div className="rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700 dark:bg-white">
              <LightboxImage
                src="/img/tools/tools-chat-gemini-image.webp"
                alt="Gemini image generation via MCP"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700 dark:bg-white">
              <LightboxImage
                src="/img/mcp-add.webp"
                alt="Add MCP Server"
                width={400}
                height={300}
                className="w-full h-auto"
              />
            </div>
            <div className="rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700 dark:bg-white">
              <LightboxImage
                src="/img/tools/tools-exec.webp"
                alt="Execute MCP Tools"
                width={400}
                height={300}
                className="w-full h-auto"
              />
            </div>
            <div className="rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700 dark:bg-white">
              <LightboxImage
                src="/img/tools/tools-exec-results.webp"
                alt="Tool Execution Results"
                width={400}
                height={300}
                className="w-full h-auto"
              />
            </div>
          </div>
          <div className="rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700 dark:bg-white">
            <LightboxImage
              src="/img/tools/tools-chat-tetris.webp"
              alt="Interactive HTML results from MCP tools"
              width={1200}
              height={600}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div id="skills" className="w-full my-16 px-4 bg-gradient-to-b from-transparent via-pink-50/50 to-transparent dark:via-pink-950/20 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Skills Support
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Extend AI capabilities with specialized knowledge, workflows, and tools
            </p>
            <Link
              href="/docs/extensions/skills"
              className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline mt-2"
            >
              Learn more →
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700 dark:bg-white">
              <LightboxImage
                src="/img/skills/skills-selector.webp"
                alt="Skills Selector"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>
            <div className="rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700 dark:bg-white">
              <LightboxImage
                src="/img/skills/skills-manage.webp"
                alt="Manage Skills"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700 dark:bg-white">
              <LightboxImage
                src="/img/skills/skills-new.webp"
                alt="Create New Skills with Skill Creator"
                width={400}
                height={300}
                className="w-full h-auto"
              />
            </div>
            <div className="rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700 dark:bg-white">
              <LightboxImage
                src="/img/skills/skills-installing.webp"
                alt="Installing New Skills"
                width={400}
                height={300}
                className="w-full h-auto"
              />
            </div>
            <div className="rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700 dark:bg-white">
              <LightboxImage
                src="/img/skills/skills-edit-page.webp"
                alt="Edit Skills"
                width={400}
                height={300}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Calculator UI Section */}
      <div id="calculator" className="w-full my-16 px-4">
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
          <div className="rounded-xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700 dark:bg-white">
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
      <div id="run-code" className="w-full my-16 px-4 bg-slate-50 dark:bg-slate-900/50 py-16">
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
      <div id="katex" className="w-full my-16 px-4 bg-gradient-to-b from-transparent via-purple-50/50 to-transparent dark:via-purple-950/20 py-16">
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
            <div className="rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700 dark:bg-white">
              <LightboxImage
                src="/img/rendering-katex.webp"
                alt="Popular math expressions"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>
            <div className="rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700 dark:bg-white">
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
      <div id="media-generation" className="w-full my-16 px-4">
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
            <div className="rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700 dark:bg-white">
              <LightboxImage
                src="/img/generate-image.webp"
                alt="Image Generation with aspect ratio selection"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>
            <div className="rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700 dark:bg-white">
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
      <div id="media-gallery" className="w-full my-16 px-4 bg-slate-50 dark:bg-slate-900/50 py-16">
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
            <div className="rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700 dark:bg-white">
              <Image
                src="/img/gallery-portrait.webp"
                alt="Portrait Images Gallery"
                width={1200}
                height={600}
                className="w-full h-auto"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700 dark:bg-white">
                <Image
                  src="/img/gallery-square.webp"
                  alt="Square Images Gallery"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
              <div className="rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700 dark:bg-white">
                <Image
                  src="/img/gallery-landscape.webp"
                  alt="Landscape Images Gallery"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </div>
            <div className="rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700 dark:bg-white">
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
      <div id="system-prompts" className="w-full my-16 px-4">
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
          <div className="rounded-xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700 dark:bg-white">
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
      <div id="provider-management" className="w-full my-16 px-4 bg-gradient-to-b from-transparent via-slate-50/50 to-transparent dark:via-slate-900/50 py-16">
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
          <div className="rounded-xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700 dark:bg-white">
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
      <div id="getting-started" className="w-full my-12 px-4">
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
