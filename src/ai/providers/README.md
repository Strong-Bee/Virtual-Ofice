# AI Provider Layer

The AI layer is vendor-neutral. Supported providers: OpenAI, Anthropic, Google Gemini, OpenRouter, NVIDIA NIM, Groq, Mistral, xAI/Grok, DeepSeek, Together AI, Fireworks AI, Perplexity, Cerebras, Cohere, Azure OpenAI, AWS Bedrock, Ollama and custom OpenAI-compatible endpoints.

Architecture:
AI Employee -> Agent Core -> Provider Registry -> Provider Adapter -> Model API

Credentials belong only in server environment variables. They are never sent to the browser, stored in Prisma, or written to logs. Provider adapters normalize text generation, streaming and structured output.

OpenRouter and custom OpenAI-compatible endpoints can select a model per AI employee. Ollama can run without a cloud API key.

See .env.example for every supported credential and endpoint.
