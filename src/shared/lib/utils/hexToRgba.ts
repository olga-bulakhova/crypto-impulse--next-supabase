export function hexToRgba(hex: string, alpha: number): string {
  const cleanHex = hex.replace('#', '');

  if (cleanHex.length !== 6) {
    return `rgba(39, 39, 42, ${alpha})`;
  }

  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
