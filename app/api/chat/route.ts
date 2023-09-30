import { OpenAIStream, StreamingTextResponse } from 'ai'
import { Configuration, OpenAIApi } from 'openai-edge'
import { SYSTEM_PROMPT, EXAMPLE_SIMPLE_NFT, EXAMPLE_POAP_NFT } from '@/lib/prompts'
export const runtime = 'edge'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration)


export async function POST(req: Request) {
  const json = await req.json()
  const { messages, functions } = json

  const res = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [SYSTEM_PROMPT, EXAMPLE_SIMPLE_NFT, EXAMPLE_POAP_NFT, ...messages],
    functions,
    temperature: 0.7,
    stream: true
  })

  const stream = OpenAIStream(res)

  return new StreamingTextResponse(stream)
}