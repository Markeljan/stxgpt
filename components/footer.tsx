import { cn } from "@/lib/utils";
import { ExternalLink } from "@/components/external-link";

export function FooterText({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex items-center justify-center w-full text-xs leading-normal text-muted-foreground space-x-2 my-0 py-0",
        className
      )}
      {...props}
    >
      <ExternalLink href="https://x.com/0xsoko">0xSoko</ExternalLink>
      <div className="hidden sm:inline">•</div>
      <ExternalLink href="https://github.com/markeljan/smart-contract-gpt">Github</ExternalLink>
      <div className="hidden sm:inline">•</div>
      <ExternalLink href="https://w3gpt.ai">W3GPT</ExternalLink>
    </div>
  );
}
