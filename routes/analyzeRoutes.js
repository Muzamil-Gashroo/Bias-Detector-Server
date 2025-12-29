import express from 'express'
import { analyzeText, analyzeUrl } from '../controllers/analyzeController.js'

const router = express.Router()

router.post('/analyze', analyzeText)
router.post('/analyze-url', analyzeUrl)

export default router
