import { IconEdit, IconStacks } from "@/components/ui/icons";
import { ThemeToggle } from "@/components/theme-toggle";
import { ConnectButton } from "@/components/connect-button";

export async function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-end w-full h-16 px-4 border-b shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
      <div className="absolute flex items-center left-0 lg:left-1/2 lg:-translate-x-1/2 gap-2 px-4 pointer-events-none">
        <IconEdit className="w-6 h-6" />
        <p className="hidden lg:flex text-lg lg:text-2xl font-semibold text-primary">Smart Contract GPT</p>
        <p className="lg:hidden text-lg lg:text-2xl font-semibold text-primary">SC GPT</p>
        <IconStacks className="w-6 h-6" />
      </div>
      <ConnectButton />

      <ThemeToggle />
    </header>
  );
}
