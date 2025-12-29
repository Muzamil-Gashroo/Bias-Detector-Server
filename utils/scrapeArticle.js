import axios from 'axios'
import { JSDOM } from 'jsdom'
import { Readability } from '@mozilla/readability'

export async function scrapeArticle(url) {
  const response = await axios.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0'
    }
  })

  const dom = new JSDOM(response.data, { url })

  const reader = new Readability(dom.window.document)
  const article = reader.parse()

  if (!article || !article.textContent) {
    throw new Error('Could not extract main article content')
  }

  return article.textContent
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 6000) 
}
