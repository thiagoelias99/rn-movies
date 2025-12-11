export function capitalizeName(name: string): string {
  return name
    .toLowerCase()
    .split(' ')
    .filter(word => word.trim().length > 0)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}