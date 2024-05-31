import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";

import { SYSTEM_PROMPT } from "@/lib/prompts";
import { toolSchemas } from "@/lib/tool-schemas";

export const runtime = "edge";

export async function POST(req: Request) {
  const json = await req.json();
  const { messages } = json;

  const result = await streamText({
    model: openai("gpt-4o"),
    system: SYSTEM_PROMPT,
    messages,
    tools: toolSchemas,
  });

  return result.toAIStreamResponse();
}
