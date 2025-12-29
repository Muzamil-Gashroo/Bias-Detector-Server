import mongoose from 'mongoose'

const analysisSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['text', 'url'],
      required: true
    },
    input: {
      type: String,
      required: true
    },
    result: {
      bias_level: String,
      confidence: Number,
      biased_sentences: [String],
      techniques: [String],
      explanation: String
    }
  },
  { timestamps: true }
)

export default mongoose.model('analysis', analysisSchema)
