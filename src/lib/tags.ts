export function dedupeTagsCaseInsensitive(tags: string[]): string[] {
  return Array.from(new Map(tags.map((tag) => [tag.toLowerCase(), tag])).values());
}
