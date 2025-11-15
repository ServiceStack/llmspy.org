# Console Carousel - Maintenance Guide

## Overview

The Console Carousel is an interactive component that showcases llms.py features through terminal-style screens. It's designed to be easy to maintain and update.

## File Structure

```
app/(home)/
├── console-carousel.tsx      # Main carousel component
├── console-screens.ts         # Screen data (EDIT THIS to add/remove screens)
└── page.tsx                   # Home page (includes the carousel)
```

## Adding a New Console Screen

To add a new screen, edit `console-screens.ts` and add a new object to the `consoleScreens` array:

```typescript
{
  id: 'unique-id',                    // Unique identifier
  title: '🎯 Feature Name',           // Title with emoji
  description: 'Brief description',   // Short description
  command: 'llms --example "query"',  // The command to show
  output: `Output text here...`       // The terminal output
}
```

### Example: Adding a Docker Command Screen

```typescript
{
  id: 'docker-deploy',
  title: '🐳 Docker Deployment',
  description: 'Run llms.py in a Docker container',
  command: 'docker run -p 8000:8000 -e GROQ_API_KEY=$GROQ_API_KEY ghcr.io/servicestack/llms:latest',
  output: `🐳 Pulling image ghcr.io/servicestack/llms:latest...
✓ Image pulled successfully

🚀 Starting container...
✓ Container started

🌐 Server running at:
   • Web UI:  http://localhost:8000
   • API:     http://localhost:8000/v1/chat/completions

Container ID: a1b2c3d4e5f6`
}
```

## Removing a Console Screen

Simply delete the corresponding object from the `consoleScreens` array in `console-screens.ts`.

## Reordering Screens

The screens appear in the order they're defined in the array. To change the order, simply move the objects around in `console-screens.ts`.

## Tips for Creating Good Console Screens

### 1. Use Realistic Commands
Base your commands on actual llms.py documentation. Check:
- `content/docs/features/cli.mdx`
- `content/docs/multimodal/*.mdx`
- `content/docs/getting-started/*.mdx`

### 2. Keep Output Concise
- Aim for 5-15 lines of output
- Use clear formatting (bullets, sections, emojis)
- Make it scannable and easy to read

### 3. Add Visual Interest
- Use emojis in titles (🎯 💬 🖼️ 🎤 📄 🌐 ⚙️)
- Use symbols in output (✓ ✗ • → ├ └ ┌ ┐)
- Add color through formatting (the terminal uses syntax highlighting)

### 4. Show Real Value
Each screen should demonstrate a specific, useful feature:
- ✅ "Analyze images with vision models"
- ✅ "Transcribe audio files"
- ❌ "Run a command" (too vague)

### 5. Format Output Nicely
```typescript
output: `Section Header:

📊 Key Points:
• Point one
• Point two
• Point three

✅ Results:
   Item 1: Value
   Item 2: Value`
```

## Customizing the Carousel

### Change Auto-Play Speed

In `page.tsx`, modify the `autoPlayInterval` prop (in milliseconds):

```typescript
<ConsoleCarousel 
  screens={consoleScreens} 
  autoPlayInterval={7000}  // 7 seconds instead of default 5
/>
```

### Disable Auto-Play

Set a very high interval or modify the component to not auto-play by default.

### Styling

The carousel uses Tailwind CSS classes. To customize:
- Edit `console-carousel.tsx` for component styling
- Terminal colors are defined in the component (green prompt, slate text, etc.)

## Testing Your Changes

1. Save your changes to `console-screens.ts`
2. The dev server will hot-reload automatically
3. Check the home page at `http://localhost:3000`
4. Navigate through all screens to verify they look good
5. Test on both light and dark modes

## Common Issues

### Screen Text Too Long
- Break into multiple lines using `\n`
- Use template literals with backticks for multi-line strings
- Keep terminal output under 20 lines for best UX

### Command Doesn't Fit
- Commands automatically truncate on small screens
- Keep commands under 80 characters when possible
- Use line breaks for very long commands

### Emojis Not Showing
- Ensure you're using standard Unicode emojis
- Test in multiple browsers

## Best Practices

1. **Keep it current**: Update screens when new features are added
2. **Show variety**: Mix different types of commands (chat, multimodal, config)
3. **Be accurate**: Commands should actually work as shown
4. **Test thoroughly**: Check all screens before deploying
5. **Get feedback**: Ask users which screens are most helpful

## Quick Reference: Common llms.py Commands

```bash
# Basic
llms "question"
llms -m model "question"
llms -s "system prompt" "question"

# Multimodal
llms --image file.png "question"
llms --audio file.mp3 "question"
llms --file document.pdf "question"

# Server
llms --serve 8000
llms --serve 8000 --verbose

# Configuration
llms --init
llms --list / llms ls
llms --enable provider
llms --disable provider
llms --default model
llms --check provider
```

## Need Help?

- Check the docs: `/content/docs/`
- See examples in: `content/docs/features/cli.mdx`
- Review existing screens in: `console-screens.ts`

