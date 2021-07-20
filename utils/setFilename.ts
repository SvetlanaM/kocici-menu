export default function setFilename(filename: string): string {
  return filename.replace(" ", "").toLowerCase()
}