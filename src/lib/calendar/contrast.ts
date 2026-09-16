export function getReadableTextColor(backgroundColor: string): string {
  const hex = backgroundColor.replace('#', '')
  if (hex.length !== 6) return '#111827'

  const red = Number.parseInt(hex.slice(0, 2), 16)
  const green = Number.parseInt(hex.slice(2, 4), 16)
  const blue = Number.parseInt(hex.slice(4, 6), 16)
  const luminance = (0.299 * red + 0.587 * green + 0.114 * blue) / 255

  return luminance > 0.6 ? '#111827' : '#FFFFFF'
}
