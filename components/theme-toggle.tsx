"use client";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { IconMoon, IconSun } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

export const ThemeToggle = () => {
	const { setTheme, resolvedTheme } = useTheme();

	return (
		<Button
			className="max-sm:opacity-0 max-sm:absolute max-sm:right-4 max-sm:top-2"
			variant="ghost"
			size="icon"
			onClick={() => {
				setTheme(resolvedTheme === "light" ? "dark" : "light");
			}}
		>
			{resolvedTheme === "light" ? (
				<IconSun
					className={cn(
						resolvedTheme === undefined && "animate-spin opacity-50",
					)}
				/>
			) : (
				<IconMoon />
			)}
			<span className="sr-only">Toggle theme</span>
		</Button>
	);
};
