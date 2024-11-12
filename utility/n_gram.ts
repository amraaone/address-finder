export function generate2Grams(text: string): string[] {
  const tokens = []
  for (let i = 0; i < text.length - 1; i++) {
    tokens.push(text.slice(i, i + 2))
  }
  return tokens
}
