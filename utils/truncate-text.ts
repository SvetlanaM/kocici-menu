export default function truncateText(text: string) {
  return text.length > 45 ? text.substring(0, 42) + '...' : text;
}