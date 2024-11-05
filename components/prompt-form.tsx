import { useEffect, useRef } from "react";
import type { UseChatHelpers } from "ai/react";
import Textarea from "react-textarea-autosize";

import { Button, buttonVariants } from "@/components/ui/button";
import { IconArrowElbow, IconHome } from "@/components/ui/icons";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEnterSubmit } from "@/lib/hooks/use-enter-submit";
import { cn } from "@/lib/utils";

type PromptProps = Pick<
	UseChatHelpers,
	"input" | "setInput" | "handleSubmit"
> & {
	isLoading: boolean;
};

export function PromptForm({
	handleSubmit,
	input,
	setInput,
	isLoading,
}: PromptProps) {
	const { formRef, onKeyDown } = useEnterSubmit();
	const inputRef = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, []);

	return (
		<form
			onSubmit={async (e) => {
				e.preventDefault();
				if (!input?.trim() || isLoading) {
					return;
				}
				handleSubmit(e);
			}}
			ref={formRef}
		>
			<div className="relative flex max-h-60 w-full grow flex-col overflow-hidden bg-background/80 dark:bg-foreground/10 px-8 sm:rounded-md sm:border sm:px-12">
				<Tooltip>
					<TooltipTrigger asChild>
						<button
							type="button"
							onClick={() => {
								location.href = "/";
							}}
							className={cn(
								buttonVariants({ size: "sm", variant: "outline" }),
								"absolute left-2 top-4 h-8 w-8 rounded-full bg-background p-0 sm:left-4",
							)}
						>
							<IconHome />
							<span className="sr-only">New Chat</span>
						</button>
					</TooltipTrigger>
					<TooltipContent>New Chat</TooltipContent>
				</Tooltip>
				<Textarea
					ref={inputRef}
					tabIndex={0}
					onKeyDown={onKeyDown}
					rows={1}
					value={input}
					onChange={(e) => setInput(e.target.value)}
					placeholder="Send a message."
					spellCheck={false}
					className="min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
				/>
				<div className="absolute right-2 top-3 sm:right-4">
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								type="submit"
								size="icon"
								disabled={isLoading || input === ""}
							>
								<IconArrowElbow />
								<span className="sr-only">Send message</span>
							</Button>
						</TooltipTrigger>
						<TooltipContent>Send message</TooltipContent>
					</Tooltip>
				</div>
			</div>
		</form>
	);
}
