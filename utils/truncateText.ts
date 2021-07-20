export default function truncateText(text: string, textLength: number) {
  if (typeof text !== 'undefined') {
    return text.length > textLength ? text.substring(0, textLength - 3) + '...' : text;
  }
}