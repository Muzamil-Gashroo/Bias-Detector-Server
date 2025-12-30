export function parseAnalysis(text) {
  const result = {
    bias_level: null,
    confidence: null,
    biased_sentences: [],
    techniques: [],
    explanation: ''
  }

  const lines = text
    .split('\n')
    .map(l => l.trim())
    .filter(Boolean)

  let currentSection = null

  for (const line of lines) {

    if (line.startsWith('Bias Level:')) {
      result.bias_level = line.replace('Bias Level:', '').trim()
      continue
    }

    if (line.startsWith('Confidence:')) {
      const value = parseInt(
        line.replace('Confidence:', '').trim(),
        10
      )
      result.confidence = isNaN(value) ? null : value
      continue
    }

    if (line.startsWith('Biased Sentences:')) {
      currentSection = 'biased_sentences'
      continue
    }

    if (line.startsWith('Techniques:')) {
      currentSection = 'techniques'
      continue
    }

    // 🔥 FIX: handle "Explanation:" on same line
    if (line.startsWith('Explanation:')) {
      currentSection = 'explanation'
      const inlineText = line.replace('Explanation:', '').trim()
      if (inlineText) {
        result.explanation += inlineText + ' '
      }
      continue
    }

    if (line.startsWith('-') && currentSection) {
      result[currentSection].push(
        line.replace(/^-/, '').trim()
      )
      continue
    }

    if (currentSection === 'explanation') {
      result.explanation += line + ' '
    }
  }

  result.explanation = result.explanation.trim()
  result.confidence = Math.max(0, Math.min(100, result.confidence ?? 0))

  return result
}
