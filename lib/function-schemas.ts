import { ChatRequestOptions } from 'ai'

export const functionSchemas: ChatRequestOptions['functions'] = [
    {
        name: 'deploy_contract',
        description: 'Deploy a Clarity smart contract to Stacks',
        parameters: {
            type: 'object',
            description: `Deploy a smart contract to Stacks using the Stacks JS library.`,
            properties: {
                networkName: {
                    type: 'string',
                    description:
                        `testnet unless overrided with mainnet or devnet.`
                },
                contractName: {
                    type: 'string'
                },
                sourceCode: {
                    type: 'string',
                    description:
                        "Source code of the smart contract. Ensure that it is the full source code and will compile. The source code should be formatted as a single-line string, with all line breaks and quotes escaped to be valid in a JSON context. Specifically, newline characters should be represented as '\\n', and double quotes should be escaped as '\\\"'."
                },
            },
            required: ['networkName', 'contractName', 'sourceCode']
        }
    },
]
