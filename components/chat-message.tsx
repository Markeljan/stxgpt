import { Message } from "ai";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import { cn } from "@/lib/utils";
import { CodeBlock } from "@/components/ui/code-block";
import { MemoizedReactMarkdown } from "@/components/markdown";
import { IconOpenAI, IconUser } from "@/components/ui/icons";
import { ChatMessageActions } from "@/components/chat-message-actions";
import { DeploymentData } from "@/lib/types";
import { Button } from "./ui/button";
import Link from "next/link";

export interface ChatMessageProps {
  message: Message;
  onFinishContractDeploy: (data: DeploymentData) => void;
}

export function ChatMessage({ message, onFinishContractDeploy, ...props }: ChatMessageProps) {
  const toolCallResult = (message.toolInvocations?.[0] as any)?.result as DeploymentData | undefined;
  if (toolCallResult) {
    message.content = toolCallResult.explorerUrl;
  }

  //   [
  //     {
  //         "toolCallId": "call_AQ5VlLyC9oQc7BMT5opKvzZn",
  //         "toolName": "deploy_contract",
  //         "args": {
  //             "networkName": "testnet",
  //             "contractName": "yolomcswagggg",
  //             "sourceCode": "(define-data-var counter int 0)\n\n(define-public (increment)\n  (begin\n    (var-set counter (+ (var-get counter) 1))\n    (ok (var-get counter))\n  )\n)\n\n(define-public (decrement)\n  (begin\n    (var-set counter (- (var-get counter) 1))\n    (ok (var-get counter))\n  )\n)\n\n(define-read-only (get-counter)\n  (ok (var-get counter))\n)"
  //         },
  //         "result": {
  //             "explorerUrl": "https://explorer.hiro.so/txid/3b2ee8f4a7dc95ec8608a9173da82e5e6d42d840106269ef50587f1394b1b37e?chain=testnet&api=https://api.nakamoto.testnet.hiro.so",
  //             "contractName": "yolomcswagggg",
  //             "network": "testnet"
  //         }
  //     }
  // ]
  return (
    <div className={cn("group relative mb-4 flex items-start md:-ml-12")} {...props}>
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow",
          message.role === "user" ? "bg-background" : "bg-primary text-primary-foreground"
        )}
      >
        {message.role === "user" ? <IconUser /> : <IconOpenAI />}
      </div>
      <div className="flex-1 px-1 ml-4 space-y-2 overflow-x-auto">
        {toolCallResult ? (
          <div className="flex flex-col flex-wrap items-center space-y-2 p-4 rounded-lg">
            <p className="text-lg font-semibold">Contract {toolCallResult.contractName} deployed successfully</p>
            <Link href={toolCallResult.explorerUrl} target="_blank" passHref>
              <Button type="button" variant="secondary" size="lg">
                <p className="text-lg">View on Explorer</p>
              </Button>
            </Link>
          </div>
        ) : (
          <MemoizedReactMarkdown
            className="reactMarkDown prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
            remarkPlugins={[remarkGfm, remarkMath]}
            linkTarget={"_blank"}
            components={{
              p({ children }) {
                return <p className="mb-2 last:mb-0">{children}</p>;
              },
              code({ node, inline, className, children, ...props }) {
                if (children.length) {
                  if (children[0] == "▍") {
                    return <span className="mt-1 animate-pulse cursor-default">▍</span>;
                  }

                  children[0] = (children[0] as string).replace("`▍`", "▍");
                }

                const match = /language-(\w+)/.exec(className || "");

                if (inline) {
                  return (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                }

                return (
                  <CodeBlock
                    key={Math.random()}
                    language={(match && match[1]) || ""}
                    value={String(children).replace(/\n$/, "")}
                    onFinishContractDeploy={onFinishContractDeploy}
                    {...props}
                  />
                );
              },
            }}
          >
            {message.content}
          </MemoizedReactMarkdown>
        )}
        <ChatMessageActions message={message} />
      </div>
    </div>
  );
}
