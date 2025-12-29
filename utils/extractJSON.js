export function extractJSON(text) {
  const first = text.indexOf('{')
  const last = text.lastIndexOf('}')

  if (first === -1 || last === -1) {
    throw new Error('Invalid JSON from model')
  }

  return JSON.parse(text.slice(first, last + 1))
}
