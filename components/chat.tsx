"use client";

import { generateId } from "ai";
import { useChat, type Message } from "ai/react";
import { toast } from "react-hot-toast";
import { track } from "@vercel/analytics";

import { ChatList } from "@/components/chat-list";
import { ChatPanel } from "@/components/chat-panel";
import { ChatScrollAnchor } from "@/components/chat-scroll-anchor";
import { cn } from "@/lib/utils";

type ChatProps = React.ComponentProps<"div"> & {
	initialMessages?: Message[];
};

export function Chat({ initialMessages, className }: ChatProps) {
	const {
		messages,
		append,
		reload,
		stop,
		isLoading,
		input,
		setInput,
		handleSubmit,
	} = useChat({
		initialMessages,
		onError(error) {
			toast.error(
				`Error: ${
					error instanceof Error ? error.message : JSON.stringify(error)
				}`,
			);
		},
	});

	return (
		<>
			<div className={cn("pb-[200px] pt-4 md:pt-10", className)}>
				{messages.length ? (
					<>
						<ChatList
							messages={messages}
							onFinishContractDeploy={(txData) => {
								track("contract-deployed", txData);
								append({
									id: generateId(),
									role: "system",
									content: `There has been a contract deployment.  Relay the result to the user:
                  ${JSON.stringify(txData, null, 2)}`,
								});
							}}
						/>
						<ChatScrollAnchor trackVisibility={isLoading} />
					</>
				) : null}
			</div>
			<ChatPanel
				isLoading={isLoading}
				stop={stop}
				handleSubmit={handleSubmit}
				reload={reload}
				messages={messages}
				input={input}
				setInput={setInput}
			/>
		</>
	);
}
