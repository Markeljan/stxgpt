"use client";

import { showConnect, useConnect } from "@stacks/connect-react";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAccount } from "@/lib/hooks/use-account";
import { useCopyToClipboard } from "@/lib/hooks/use-copy-to-clipboard";
import { useUserSession } from "@/lib/hooks/use-user-session";
import { cn } from "@/lib/utils";

export const WalletConnect = () => {
	const { isSignedIn, stxAddress, network, setNetwork } = useAccount();
	const { userSession } = useUserSession();
	const { authOptions } = useConnect();
	const { isCopied, copyToClipboard } = useCopyToClipboard({
		timeout: 2000,
	});
	const handleLogin = () => {
		showConnect(authOptions);
	};

	const handleLogout = () => {
		userSession?.signUserOut();
	};

	const handleCopy = () => {
		if (isCopied || !stxAddress) return;
		copyToClipboard(stxAddress);
	};

	const toggleNetwork = () => {
		setNetwork?.(network === "mainnet" ? "testnet" : "mainnet");
	};

	const truncateAddress = (address: string) => {
		return `${address.slice(0, 6)} · ${address.slice(-4)}`;
	};

	return (
		<div
			className={cn(
				"relative flex items-center justify-between w-full h-12 px-4 bg-secondary text-secondary-foreground rounded-full shadow-md max-sm:h-10 transition-colors duration-200",
				!isSignedIn && "bg-primary",
			)}
		>
			<Button
				type="button"
				onClick={isSignedIn ? toggleNetwork : handleLogin}
				className="z-10 flex items-center justify-center w-18 h-6 text-xs font-medium rounded-full focus:outline-none transition-all duration-200 relative overflow-hidden"
			>
				{!isSignedIn ? (
					<p>Connect Wallet</p>
				) : (
					<>
						<div
							className={`absolute inset-0 ${
								network === "testnet" ? "bg-lime-400/70" : "bg-orange-400/50"
							} transition-all duration-200 ${
								network === "testnet" ? "translate-x-0" : "translate-x-full"
							}`}
						/>
						<span className="relative z-10">
							{network === "testnet" ? "Testnet" : "Mainnet"}
						</span>
					</>
				)}
			</Button>
			<div className="flex items-center space-x-2">
				{stxAddress ? (
					<>
						<Button
							type="button"
							onClick={handleCopy}
							variant="ghost"
							className="p-1 text-secondary-foreground/70 transition-colors duration-100 active:scale-95 active:text-green-600"
						>
							{truncateAddress(stxAddress)}
						</Button>

						<Button
							type="button"
							onClick={handleLogout}
							variant="ghost"
							className="p-1 text-secondary-foreground/70 hover:text-primary transition-colors duration-200"
						>
							<span className="sr-only">Logout</span>
							<X className="h-4 w-4 transition-transform duration-200 hover:scale-125" />
						</Button>
					</>
				) : null}
			</div>
		</div>
	);
};
