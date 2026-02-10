export function formatStorageSize(bytes: number) {
  const mb = bytes / (1024 * 1024)
  const gb = mb / 1024

  if (gb >= 1) {
    return `${gb.toFixed(2)} GB`
  }
  
  return `${mb.toFixed(2)} MB`
}