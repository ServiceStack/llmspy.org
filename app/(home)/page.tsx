import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold tracking-tight">llms.py</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Lightweight OpenAI compatible CLI and server gateway for multiple LLMs
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/docs"
            className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
          >
            Get Started
          </Link>
          <a
            href="https://github.com/ServiceStack/llms"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-lg border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors font-semibold"
          >
            View on GitHub
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-16 text-left">
          <div className="p-6 rounded-lg border bg-card">
            <h3 className="font-semibold text-lg mb-2">🪶 Ultra-Lightweight</h3>
            <p className="text-sm text-muted-foreground">
              Single file with just one aiohttp dependency. Perfect for ComfyUI and minimal environments.
            </p>
          </div>
          <div className="p-6 rounded-lg border bg-card">
            <h3 className="font-semibold text-lg mb-2">🌐 Multi-Provider</h3>
            <p className="text-sm text-muted-foreground">
              Access 160+ models from OpenAI, Anthropic, Google, Grok, Groq, Ollama, and more.
            </p>
          </div>
          <div className="p-6 rounded-lg border bg-card">
            <h3 className="font-semibold text-lg mb-2">💻 ChatGPT-like UI</h3>
            <p className="text-sm text-muted-foreground">
              Fast, privacy-focused web interface with dark mode and built-in analytics.
            </p>
          </div>
        </div>

        <div className="mt-12 p-6 rounded-lg bg-muted">
          <h3 className="font-semibold mb-4">Quick Install</h3>
          <code className="text-sm bg-background px-4 py-2 rounded border block">
            pip install llms-py
          </code>
        </div>
      </div>
    </main>
  );
}
