import type { UseChatHelpers } from "ai/react";

import { Button } from "@/components/ui/button";
import { PromptForm } from "@/components/prompt-form";
import { ButtonScrollToBottom } from "@/components/button-scroll-to-bottom";
import { IconRefresh, IconStop } from "@/components/ui/icons";
import { FooterText } from "@/components/footer";

type ChatPanelProps = Pick<
	UseChatHelpers,
	| "isLoading"
	| "reload"
	| "messages"
	| "stop"
	| "input"
	| "setInput"
	| "handleSubmit"
>;

export function ChatPanel({
	isLoading,
	stop,
	reload,
	input,
	setInput,
	handleSubmit,
	messages,
}: ChatPanelProps) {
	return (
		<div className="fixed inset-x-0 bottom-0 bg-gradient-to-b from-muted/10 from-10% to-muted/30 to-50%">
			<div className="mb-1">
				<ButtonScrollToBottom />
			</div>
			<div className="mx-auto sm:max-w-2xl sm:px-4">
				<div className="flex h-10 items-center justify-center mb-1">
					{isLoading ? (
						<Button
							variant="outline"
							onClick={() => stop()}
							className="bg-background"
						>
							<IconStop className="mr-2" />
							Stop generating
						</Button>
					) : (
						messages?.length > 0 && (
							<Button
								variant="outline"
								onClick={async () => await reload()}
								className="bg-background"
							>
								<IconRefresh className="mr-2" />
								Regenerate response
							</Button>
						)
					)}
				</div>
				<div className="space-y-2 border-t bg-foreground/5 dark:bg-background/80 backdrop-blur-3xl sm:px-4 shadow-lg sm:rounded-t-xl sm:border md:pt-4 pb-2">
					<PromptForm
						handleSubmit={handleSubmit}
						input={input}
						setInput={setInput}
						isLoading={isLoading}
					/>
					<FooterText />
				</div>
			</div>
		</div>
	);
}
