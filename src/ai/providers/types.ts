import {z} from "zod";
export const aiProviderIds=["openai","anthropic","gemini","openrouter","nvidia","groq","mistral","xai","deepseek","together","fireworks","perplexity","cerebras","cohere","azure-openai","bedrock","ollama","custom"] as const;
export type AIProviderId=(typeof aiProviderIds)[number];
export interface AIResponse{text:string;model:string;provider:AIProviderId;inputTokens?:number;outputTokens?:number;estimatedCost?:number}
export interface AIChunk{text:string;done:boolean}
export interface AIInput{messages:Array<{role:"system"|"user"|"assistant";content:string}>;model?:string;temperature?:number;maxTokens?:number}
export interface AIProvider{readonly id:AIProviderId;generateText(input:AIInput):Promise<AIResponse>;streamText(input:AIInput):AsyncIterable<AIChunk>;generateStructuredOutput<T>(input:AIInput):Promise<T>}
