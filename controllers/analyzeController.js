import { InferenceClient } from '@huggingface/inference'
import analysis from '../models/analysis.js'
import { extractJSON } from '../utils/extractJSON.js'
import { scrapeArticle } from '../utils/scrapeArticle.js'

const hf = new InferenceClient(process.env.HF_TOKEN)

export async function analyzeText(req, res) {
  const { text } = req.body
  if (!text) return res.status(400).json({ error: 'Text required' })

  try {
    const response = await hf.chatCompletion({
      model: 'meta-llama/Llama-3.1-8B-Instruct',
      messages: [
        { role: 'system', content: process.env.ANALYSIS },
        { role: 'user', content: `Analyze this text:\n"""${text}"""` }
      ],
      temperature: 0.2,
      max_tokens: 400
    })

    const result = extractJSON(response.choices[0].message.content)
    result.confidence = Math.max(0, Math.min(100, result.confidence))

    await analysis.create({
      type: 'text',
      input: text,
      result
    })

    res.json(result)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Text analysis failed' })
  }
}

export async function analyzeUrl(req, res) {
  const { url } = req.body
  if (!url) return res.status(400).json({ error: 'URL required' })

  try {
    const articleText = await scrapeArticle(url)

    const response = await hf.chatCompletion({
      model: 'meta-llama/Llama-3.1-8B-Instruct',
      messages: [
        { role: 'system', content: process.env.ANALYSIS },
        { role: 'user', content: `Analyze this article:\n"""${articleText}"""` }
      ],
      temperature: 0.2,
      max_tokens: 400
    })

    const result = extractJSON(response.choices[0].message.content)
    result.confidence = Math.max(0, Math.min(100, result.confidence))

    await analysis.create({
      type: 'url',
      input: url,
      result
    })

    res.json(result)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'URL analysis failed' })
  }
}
