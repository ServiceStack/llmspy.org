import { ConsoleScreen } from './console-carousel'

export const consoleScreens: ConsoleScreen[] = [
  {
    id: 'basic-chat',
    title: '💬 Simple Chat',
    description: 'Ask questions directly from the command line',
    command: 'llms "What is the capital of France?"',
    output: `Paris is the capital of France. It's located in the north-central part of the country and is known for its art, fashion, gastronomy, and culture. The city is home to iconic landmarks like the Eiffel Tower, the Louvre Museum, and Notre-Dame Cathedral.`
  },
  {
    id: 'model-selection',
    title: '🎯 Choose Your Model',
    description: 'Use specific models from different providers',
    command: 'llms -m grok-4-fast "Explain quantum computing in simple terms"',
    output: `Quantum computing is like having a super-powered calculator that can explore many solutions at once, instead of checking them one by one.

Traditional computers use bits (0s and 1s), but quantum computers use "qubits" that can be both 0 and 1 simultaneously. This allows them to solve certain complex problems much faster than regular computers.

Think of it like finding a book in a library: a regular computer checks each shelf one by one, while a quantum computer can check all shelves at the same time!`
  },
  {
    id: 'image-analysis',
    title: '🖼️ Vision Analysis',
    description: 'Analyze images with vision-capable models',
    command: 'llms --image chart.png "Analyze this chart"',
    output: `This chart shows quarterly revenue growth over the past year:

📊 Key Insights:
• Q1: $2.5M (baseline)
• Q2: $3.1M (+24% growth)
• Q3: $3.8M (+23% growth)
• Q4: $4.5M (+18% growth)

The data indicates consistent upward trend with total annual growth of 80%. The growth rate is gradually stabilizing, which is typical for maturing products.`
  },
  {
    id: 'audio-transcription',
    title: '🎤 Audio Transcription',
    description: 'Transcribe and analyze audio files',
    command: 'llms --audio meeting.wav "Summarize this meeting"',
    output: `Meeting Summary:

📋 Main Topics:
1. Q4 Product Launch - scheduled for December 15th
2. Marketing campaign budget approved at $50K
3. New hire onboarding process improvements

✅ Action Items:
• Sarah: Finalize product documentation by Nov 30
• Mike: Set up marketing automation workflows
• Team: Review new onboarding checklist by Friday

Next meeting: November 22nd, 2:00 PM`
  },
  {
    id: 'pdf-processing',
    title: '📄 Document Analysis',
    description: 'Process and analyze PDF documents',
    command: 'llms --file report.pdf "Extract key findings"',
    output: `Key Findings from Annual Report:

💰 Financial Performance:
• Revenue: $45.2M (↑ 32% YoY)
• Net Profit: $8.7M (↑ 28% YoY)
• Operating Margin: 19.2%

🎯 Strategic Initiatives:
• Expanded to 3 new markets
• Launched 5 new product features
• Grew team from 85 to 120 employees

🔮 2024 Outlook:
• Projected revenue: $60M`
  },
  {
    id: 'system-prompt',
    title: '🤖 Custom System Prompts',
    description: 'Use system prompts to customize AI behavior',
    command: 'llms -s "You are a Python expert" "How do I reverse a string?"',
    output: `Here are the most common ways to reverse a string in Python:

1. Using slicing (most Pythonic):
   reversed_str = original_str[::-1]

2. Using reversed() function:
   reversed_str = ''.join(reversed(original_str))

3. Using a loop:
   reversed_str = ''
   for char in original_str:
       reversed_str = char + reversed_str

The slicing method [::-1] is the most concise and efficient.`
  },
  {
    id: 'server-mode',
    title: '🌐 Start Web Server',
    description: 'Launch the ChatGPT-like web UI and API server',
    command: 'llms --serve 8000',
    output: `Starting server on port 8000...

🌐 Runs Server at:
   • Web UI:  http://localhost:8000
   • API:     http://localhost:8000/v1/chat/completions

Uses:
  • LLM configuration from ~/.llms/llms.json
  • UI configuration from ~/.llms/ui.json
  `},
  {
    id: 'provider-management',
    title: '⚙️ Manage Providers',
    description: 'Enable, disable, and check provider status',
    command: 'llms --check groq',
    output: `Checking 10 models for provider 'groq':

  ✓ compound                                 (190ms)
  ✓ compound-mini                            (628ms)
  ✓ llama3.1:8b                              (292ms)
  ✓ llama3.3:70b                             (299ms)
  ✓ llama4:109b                              (118ms)
  ✓ llama4:400b                              (401ms)
  ✓ kimi-k2                                  (408ms)
  ✓ gpt-oss:120b                             (119ms)
  ✓ gpt-oss:20b                              (306ms)
  ✓ qwen3:32b                                (448ms)
  `},
  {
    id: 'list-models',
    title: '📋 List Available Models',
    description: 'View all enabled providers and their models',
    command: 'llms ls',
    output: `openai:
  gpt-5-nano
  gpt-5-mini
  gpt-5
  ...
grok:
  grok-4
  grok-code-fast-1
  grok-4-fast-reasoning
  grok-4-fast-non-reasoning

Enabled: openai, grok, anthropic, z.ai, google, openrouter
Disabled: google_free, ollama, codestral, groq, mistral, qwen`
  }
]

