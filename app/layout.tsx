import type { Metadata, Viewport } from "next";
import {
	JetBrains_Mono as FontMono,
	Inter as FontSans,
} from "next/font/google";

import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "react-hot-toast";
import { DEPLOYMENT_URL } from "vercel-url";

import "@/app/globals.css";
import { Header } from "@/components/header";
import { Providers } from "@/components/providers";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans",
});

const fontMono = FontMono({
	subsets: ["latin"],
	variable: "--font-mono",
});

export const metadata: Metadata = {
	title: "STXGPT",
	description: "Write smart contract in any language and deploy to Stacks.",
	icons: {
		icon: "/favicon.ico",
	},
	openGraph: {
		title: "STXGPT",
		description: "Write smart contract in any language and deploy to Stacks",
		url: DEPLOYMENT_URL,
		siteName: "STXGPT",
		images: [
			{
				url: `${DEPLOYMENT_URL}/opengraph-image.png`,
				alt: "STXGPT",
				width: 1450,
				height: 760,
			},
		],
		locale: "en_US",
		type: "website",
	},
	twitter: {
		title: "STXGPT",
		description: "Write smart contract in any language and deploy to Stacks",
		site: DEPLOYMENT_URL,
		images: [
			{
				url: `${DEPLOYMENT_URL}/twitter-image.png`,
				alt: "STXGPT",
				width: 1450,
				height: 760,
			},
		],
	},
	metadataBase: new URL(DEPLOYMENT_URL),
};

export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "white" },
		{ media: "(prefers-color-scheme: dark)", color: "black" },
	],
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head />
			<body
				className={cn(
					"font-sans antialiased",
					fontSans.variable,
					fontMono.variable,
				)}
			>
				<Toaster />
				<Providers>
					<div className="flex flex-col min-h-screen">
						<Header />
						<Analytics />
						<main className="flex flex-col flex-1 bg-muted/50">{children}</main>
					</div>
				</Providers>
			</body>
		</html>
	);
}
