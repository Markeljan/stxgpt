import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

import { SYSTEM_PROMPT } from "@/lib/prompts";
import { toolSchemas } from "@/lib/tool-schemas";

export async function POST(req: Request) {
	const json = await req.json();
	const { messages } = json;

	const result = await streamText({
		model: openai("gpt-4o"),
		system: SYSTEM_PROMPT,
		messages,
		tools: toolSchemas,
	});

	return result.toDataStreamResponse();
}
