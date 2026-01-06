interface YouTubeProps {
  id: string;
  title?: string;
}

/**
 * A YouTube embed component for documentation.
 * Uses lite-youtube-embed style with a thumbnail preview.
 */
export function YouTube({ id, title = 'YouTube Video' }: YouTubeProps) {
  return (
    <div className="relative my-4 aspect-video w-full overflow-hidden rounded-lg">
      <iframe
        className="absolute inset-0 h-full w-full"
        src={`https://www.youtube.com/embed/${id}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

