import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import analyzeRoutes from './routes/analyzeRoutes.js'
import { connectDB } from './config/connectDB.js'

const PORT = process.env.PORT || 3000;
const app = express()

app.use(cors())
app.use(express.json())

connectDB()

app.use('/', analyzeRoutes)

app.listen(PORT, () => {
  console.log('Server ON')
})
