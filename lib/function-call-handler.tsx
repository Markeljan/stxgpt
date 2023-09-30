import { ChatRequest, FunctionCallHandler, nanoid } from "ai";
import { functionSchemas } from "@/lib/function-schemas";

const functionCallHandler: FunctionCallHandler = async (chatMessages, functionCall) => {
    if (functionCall.name === 'deploy_contract') {
        const response = await fetch('/api/deploy-contract', {
            method: 'POST',
            body: functionCall.arguments
        })

        let content: string
        let role: 'system' | 'function'

        if (response.ok) {
            const { networkName, txId } = await response.json()
            content = JSON.stringify({ networkName, txId })
            role = 'function'
        } else {
            const { error } = (await response?.json()) ?? {}
            content =
                JSON.stringify({ error }) +
                '\n\n' +
                'There has been an error deploying, share it with the user.'
            role = 'system'
        }

        const functionResponse: ChatRequest = {
            messages: [
                ...chatMessages,
                {
                    id: nanoid(),
                    name: 'deploy_contract',
                    role: role,
                    content: content,
                }
            ],
            functions: functionSchemas
        }

        return functionResponse

    }

}

export default functionCallHandler
