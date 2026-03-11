export interface SubstackPost {
  title: string;
  url: string;
  date: string;
  excerpt: string;
  coverImage?: string;
}

/**
 * Fetch and parse posts from a Substack RSS feed.
 * @param publication - Substack subdomain (e.g. 'josensilva' or 'awarenessparadox')
 * @param limit - Max number of posts to return (default: 3)
 */
export async function fetchSubstackPosts(
  publication: string,
  limit = 3,
): Promise<SubstackPost[]> {
  try {
    const res = await fetch(`https://${publication}.substack.com/feed`, {
      next: { revalidate: 3600 }, // revalidate every hour
    });

    if (!res.ok) return [];

    const xml = await res.text();
    const posts: SubstackPost[] = [];

    // Simple XML parsing — extract <item> blocks
    const items = xml.split('<item>').slice(1); // skip preamble

    for (const item of items.slice(0, limit)) {
      const title = extractTag(item, 'title');
      const url = extractTag(item, 'link');
      const pubDate = extractTag(item, 'pubDate');
      const description = extractTag(item, 'description');

      // Try to extract cover image from enclosure or description
      const enclosureMatch = item.match(/url="([^"]+\.(jpg|jpeg|png|webp))/i);
      const coverImage = enclosureMatch?.[1] || undefined;

      // Strip HTML tags from description to get plain text excerpt
      const plainText = description
        .replace(/<[^>]+>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .trim();

      const excerpt =
        plainText.length > 160
          ? plainText.slice(0, 160).replace(/\s+\S*$/, '') + '...'
          : plainText;

      posts.push({
        title: decodeEntities(title),
        url,
        date: pubDate ? formatDate(pubDate) : '',
        excerpt,
        coverImage,
      });
    }

    return posts;
  } catch {
    console.error(`Failed to fetch Substack feed for ${publication}`);
    return [];
  }
}

function extractTag(xml: string, tag: string): string {
  // Handle CDATA sections
  const cdataRegex = new RegExp(`<${tag}><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>`);
  const cdataMatch = xml.match(cdataRegex);
  if (cdataMatch) return cdataMatch[1].trim();

  // Handle regular tags
  const regex = new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`);
  const match = xml.match(regex);
  return match ? match[1].trim() : '';
}

function decodeEntities(text: string): string {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function formatDate(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateStr;
  }
}
