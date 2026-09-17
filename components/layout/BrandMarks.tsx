type MarkProps = {
  className?: string;
};

// lucide-react's v1 line dropped brand/logo icons for trademark reasons, so these
// hand-vectored marks stand in for LinkedIn and X.

// LinkedIn's "in" glyph, self-contained on its own white card so it reads correctly
// regardless of the surrounding tile color.
export function LinkedInMark({ className = "" }: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="4" fill="white" />
      <g transform="translate(6 5.14) scale(0.02679)" fill="#325FA6">
        <path d="M100.28 448H7.4V148.9h92.88zm-46.44-341.7C24.09 106.3 0 82.1 0 52.3a53.79 53.79 0 0 1 107.58 0c0 29.8-24.1 54-53.74 54zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
      </g>
    </svg>
  );
}

// The X (formerly Twitter) wordmark, geometric crossing-strokes glyph.
export function XMark({ className = "" }: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

// LinkedIn's "in" glyph only, in currentColor — for placing directly on a colored
// tile (no separate white card), unlike LinkedInMark above.
export function LinkedInGlyph({ className = "" }: MarkProps) {
  return (
    <svg viewBox="0 0 448 512" className={className} fill="currentColor" aria-hidden="true">
      <path d="M100.28 448H7.4V148.9h92.88zm-46.44-341.7C24.09 106.3 0 82.1 0 52.3a53.79 53.79 0 0 1 107.58 0c0 29.8-24.1 54-53.74 54zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
    </svg>
  );
}

// GitHub's "octocat" mark, in currentColor.
export function GithubMark({ className = "" }: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}
