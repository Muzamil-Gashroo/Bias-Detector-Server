# Media Bias Analyzer

Media Bias Analyzer is an AI-assisted system designed to analyze news articles and textual content for **bias, framing, and manipulative narrative techniques**.  
The project applies Large Language Models (LLMs) to produce structured, explainable assessments of media content.

This repository represents an open-source, research-oriented implementation focused on **clarity, transparency, and extensibility**.

---

## Overview

The system accepts either raw textual input or article URLs, extracts the primary content, and evaluates it for:

- Narrative bias
- Emotional manipulation
- Framing strategies
- Propaganda techniques

Results are returned in a structured JSON format to support interpretability and downstream analysis.

---

## Core Capabilities

- Analysis of pasted textual content
- Article-level analysis via URL ingestion
- Bias classification (Low / Medium / High)
- Confidence scoring
- Sentence-level identification of biased content
- Detection of framing and manipulation techniques
- Persistent storage of inputs and outputs for research and evaluation

---

## Artificial Intelligence and Models

- Model inference is performed via the **Hugging Face Inference API**
- Utilizes **LLaMA 3.1 Instruct** models for reasoning and analysis
- Content extraction is site-agnostic, using **Mozilla Readability**
- Outputs are constrained to structured JSON for explainability

---

## Technology Stack

### Backend
- Node.js (ES Modules)
- Express.js
- MongoDB Atlas with Mongoose
- Hugging Face Inference Client
- Axios, JSDOM, Mozilla Readability

### Frontend
- React / Next.js (UI generated via Lovable)
- Centralized API configuration for extensibility
- Modern, responsive interface design

---

## API Endpoints

| Method | Endpoint | Description |
|------|--------|------------|
| POST | `/analyze` | Analyze raw text input |
| POST | `/analyze-url` | Analyze article content via URL |

---

## Environment Configuration

The application requires the following environment variables:

```env
HF_TOKEN=HuggingFace API token
MONGODB_URI=MongoDB Atlas connection string
ANALYSIS=System prompt used for bias analysis

