import { ThemeToggle } from "@/components/theme-toggle";
import { IconEdit, IconStacks } from "@/components/ui/icons";
import { WalletConnect } from "@/components/wallet-connect";

export function Header() {
	return (
		<header className="sticky top-0 z-50 w-full max-sm:h-20 h-16 px-4 border-b shrink-0 bg-foreground/10 dark:bg-background">
			<div className="flex items-center justify-between h-full max-w-7xl mx-auto">
				<div className="flex items-center gap-2 max-sm:absolute max-sm:right-6 max-sm:top-4">
					<IconEdit className="w-6 h-6" />
					<IconStacks className="w-6 h-6" />
				</div>
				<div className="absolute right-6 top-10 sm:left-1/2 sm:top-1/2 sm:transform sm:-translate-x-1/2 sm:-translate-y-1/2">
					<p className="hidden lg:block text-2xl font-semibold text-primary pointer-events-none select-none">
						STXGPT
					</p>
					<p className="lg:hidden text-lg font-semibold text-primary pointer-events-none select-none">
						SC GPT
					</p>
				</div>
				<div className="flex items-center gap-4">
					<WalletConnect />
					<ThemeToggle />
				</div>
			</div>
		</header>
	);
}
