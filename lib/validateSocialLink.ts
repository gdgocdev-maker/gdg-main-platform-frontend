import type { SocialLink } from "@/lib/constants/profile";

const requiredDomain: Partial<Record<SocialLink["platform"], string>> = {
  github: "github.com",
  linkedin: "linkedin.com",
};

// Empty values are allowed (renders as "Not added yet") — only non-empty values
// are checked, so clearing a field is always a valid way to remove a link.
export function validateSocialLink(
  platform: SocialLink["platform"],
  value: string,
): string | null {
  if (!value.trim()) return null;

  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return "Enter a full URL, e.g. https://example.com";
  }

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    return "URL must start with http:// or https://";
  }

  const domain = requiredDomain[platform];
  if (domain && !url.hostname.endsWith(domain)) {
    return `Must be a ${domain} link`;
  }

  return null;
}
