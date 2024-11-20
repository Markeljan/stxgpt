import type { Message } from "ai";

import { ChatMessage } from "@/components/chat-message";
import { Separator } from "@/components/ui/separator";
import type { DeploymentData } from "@/lib/types";
import { filterMessages } from "@/lib/utils";

export interface ChatList {
	messages: Message[];
	onFinishContractDeploy: (data: DeploymentData) => void;
}

export function ChatList({ messages, onFinishContractDeploy }: ChatList) {
	const filteredMessages = filterMessages(messages);

	return (
		<div className="relative mx-auto max-md:max-w-2xl max-w-3xl px-4">
			{filteredMessages.map((message, index) => (
				<div key={message.id}>
					<ChatMessage
						message={message}
						onFinishContractDeploy={onFinishContractDeploy}
					/>
					{index < filteredMessages.length - 1 && (
						<Separator className="my-4 md:my-8" />
					)}
				</div>
			))}
		</div>
	);
}
