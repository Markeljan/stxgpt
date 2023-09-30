import { OpenAIStream, StreamingTextResponse } from 'ai'
import { Configuration, OpenAIApi } from 'openai-edge'
import { SYSTEM_MESSAGE } from '@/lib/prompts'
export const runtime = 'edge'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration)


export async function POST(req: Request) {
  const json = await req.json()
  const { messages } = json

  const res = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [SYSTEM_MESSAGE, ...messages],
    temperature: 0.7,
    stream: true
  })

  const stream = OpenAIStream(res)

  return new StreamingTextResponse(stream)
}