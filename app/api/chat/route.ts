import { OpenAIStream, StreamingTextResponse } from "ai";
import { Configuration, OpenAIApi } from "openai-edge";
import { SYSTEM_PROMPT, EXAMPLE_SIP10_FUNGIBLE_TOKEN, EXAMPLE_POAP_NON_FUNGIBLE_TOKEN } from "@/lib/prompts";
export const runtime = "edge";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(req: Request) {
  const json = await req.json();
  const { messages, functions } = json;

  const res = await openai.createChatCompletion({
    model: "gpt-4-turbo-preview",
    messages: [SYSTEM_PROMPT, EXAMPLE_SIP10_FUNGIBLE_TOKEN, EXAMPLE_POAP_NON_FUNGIBLE_TOKEN, ...messages],
    functions,
    temperature: 0.2,
    top_p: 0.1,
    stream: true,
  });

  const stream = OpenAIStream(res);

  return new StreamingTextResponse(stream);
}
