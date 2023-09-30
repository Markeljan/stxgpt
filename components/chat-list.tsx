import { type Message } from 'ai'

import { Separator } from '@/components/ui/separator'
import { ChatMessage } from '@/components/chat-message'
import { filterMessages } from '@/lib/utils'

export interface ChatList {
    messages: Message[]
}

export function ChatList({ messages }: ChatList) {
    const filteredMessages = filterMessages(messages)

    return (
        <div className="relative mx-auto max-w-2xl px-4">
            {filteredMessages.map((message, index) => (
                <div key={index}>
                    <ChatMessage message={message} />
                    {index < filteredMessages.length - 1 && (
                        <Separator className="my-4 md:my-8" />
                    )}
                </div>
            ))}
        </div>
    )
}