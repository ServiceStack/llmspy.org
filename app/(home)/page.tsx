import Link from 'next/link';
import { ClickableCodeBlock } from './clickable-code-block';
import { ConsoleCarousel } from './console-carousel';
import { consoleScreens } from './console-screens';
import { ScreenshotCarousel } from './screenshot-carousel';
import { screenshotScreens } from './screenshot-screens';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="mt-8 flex flex-col items-center justify-center min-h-screen">
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
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-background hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-400 dark:hover:border-slate-500 transition-all font-semibold shadow-md hover:shadow-lg"
          >
            View on GitHub
          </a>
        </div>

        {/* Quick Install */}
        <div className="mt-12 mx-auto max-w-3xl rounded-lg bg-muted">
          <h3 className="font-semibold mb-4">Quick Install</h3>
          <ClickableCodeBlock>pip install llms-py</ClickableCodeBlock>
        </div>

        {/* Console Carousel Section */}
        <div className="mt-12 w-full px-4">
          <div className="w-full max-w-4xl mx-auto">
            <ConsoleCarousel screens={consoleScreens} />
          </div>
        </div>

        <div className="mt-12 mx-auto max-w-3xl rounded-lg bg-muted">
          <h3 className="font-semibold my-4">Run Server</h3>
          <ClickableCodeBlock>llms --serve 8000</ClickableCodeBlock>
        </div>
      </div>

      {/* Screenshot Carousel Section - Outside constrained container */}
      <div className="w-full my-12 px-4">
        <ScreenshotCarousel screens={screenshotScreens} className="max-w-[1200px] mx-auto" />
      </div>

      {/* Getting Started Call-out */}
      <div className="w-full my-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-8 text-center shadow-lg">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">
              Ready to Get Started?
            </h3>
            <p className="text-slate-700 dark:text-slate-300 mb-6 text-lg">
              Install llms.py and start chatting with 160+ AI models in minutes
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/docs"
                className="px-8 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
              >
                📚 View Documentation
              </Link>
              <a
                href="https://github.com/ServiceStack/llms"
                target="_blank"
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

      <div className="max-w-7xl mx-auto text-center space-y-8">

        {/* Feature Cards */}
        <div className="my-24 max-w-4xl grid md:grid-cols-3 gap-6 text-left">
          <Card className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border-slate-200 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="text-lg font-semibold leading-none tracking-tight text-slate-900 dark:text-slate-100">🪶 Ultra-Lightweight</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700 dark:text-slate-300">
                Single file with just one aiohttp dependency. Perfect for ComfyUI and minimal environments.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border-slate-200 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="text-lg font-semibold leading-none tracking-tight text-slate-900 dark:text-slate-100">🌐 Multi-Provider</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700 dark:text-slate-300">
                Access 160+ models from OpenAI, Anthropic, Google, Grok, Groq, Ollama, and more.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border-slate-200 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="text-lg font-semibold leading-none tracking-tight text-slate-900 dark:text-slate-100">💻 ChatGPT-like UI</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700 dark:text-slate-300">
                Fast, privacy-focused web interface with dark mode and built-in analytics.
              </p>
            </CardContent>
          </Card>
        </div>

      </div>
    </main>
  );
}
