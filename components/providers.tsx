"use client";

import { type AuthOptions, Connect } from "@stacks/connect-react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { DEPLOYMENT_URL } from "vercel-url";

import { TooltipProvider } from "@/components/ui/tooltip";
import { useUserSession } from "@/lib/hooks/use-user-session";

const appDetails = {
	name: "STXGPT",
	icon: `${DEPLOYMENT_URL}/stacks.png`,
};

export function Providers({ children }: { children: React.ReactNode }) {
	const { setUserSession } = useUserSession();

	const authOptions: AuthOptions = {
		appDetails,
		onFinish({ userSession: newSession }) {
			setUserSession(newSession);
		},
	};
	return (
		<Connect authOptions={authOptions}>
			<NextThemesProvider
				attribute="class"
				defaultTheme="system"
				enableSystem
				storageKey="theme-preference"
			>
				<TooltipProvider>{children}</TooltipProvider>
			</NextThemesProvider>
		</Connect>
	);
}
