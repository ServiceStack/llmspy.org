import { Star } from 'lucide-react'

async function getGitHubStars(repo: string): Promise<number | null> {
  try {
    const response = await fetch(`https://api.github.com/repos/${repo}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
    })

    if (!response.ok) {
      console.error('Failed to fetch GitHub stars:', response.statusText)
      return null
    }

    const data = await response.json()
    return data.stargazers_count
  } catch (error) {
    console.error('Error fetching GitHub stars:', error)
    return null
  }
}

function formatStarCount(count: number): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`
  }
  return count.toString()
}

export async function GitHubStars({ repo }: { repo: string }) {
  const stars = await getGitHubStars(repo)

  if (stars === null) {
    return null
  }

  return (
    <span className="inline-flex items-center gap-1 text-fd-muted-foreground text-xs font-medium">
      <Star className="w-3.5 h-3.5" />
      <span>{formatStarCount(stars)}</span>
    </span>
  )
}

