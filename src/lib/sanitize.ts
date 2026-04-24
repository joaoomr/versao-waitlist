/**
 * Sanitize user input text — strip HTML tags and trim.
 * Used before persisting any user-generated content.
 */
export function sanitize(input: string): string {
  return input
    .replace(/<[^>]*>/g, "")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .trim();
}

/**
 * Sanitize an array of strings.
 */
export function sanitizeArray(inputs: string[]): string[] {
  return inputs.map(sanitize).filter(Boolean);
}
