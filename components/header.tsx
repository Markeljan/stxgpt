import { IconEdit, IconStacks } from "@/components/ui/icons";
import { ThemeToggle } from "@/components/theme-toggle";
import { ConnectButton } from "@/components/connect-button";

export async function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
      <div className="flex items-center gap-2 ml-4">
        <IconEdit className="w-6 h-6" />
        <IconStacks className="w-6 h-6" />
      </div>
      <div className="flex flex-col items-center px-4 ">
        <p className="hidden lg:flex text-lg lg:text-2xl font-semibold text-primary pointer-events-none select-none">
          STXGPT
        </p>
        <p className="lg:hidden text-lg lg:text-2xl font-semibold text-primary pointer-events-none select-none">
          SC GPT
        </p>
        <p className="hidden lg:flex text-xs lg:text-sm text-secondary-foreground">
          rpc: https://api.nakamoto.testnet.hiro.so
        </p>
      </div>
      <div className="flex items-center gap-4">
        <ConnectButton />
        <ThemeToggle />
      </div>
    </header>
  );
}
