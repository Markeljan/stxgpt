import { Metadata, Viewport } from "next";
import { JetBrains_Mono as FontMono, Inter as FontSans } from "next/font/google";

import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";

import "@/app/globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "@/components/providers";
import { Header } from "@/components/header";
import { APP_URL } from "@/app/config";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Smart Contract GPT",
  description: "Write smart contract in any language and deploy to Stacks.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Smart Contract GPT",
    description: "Write smart contract in any language and deploy to Stacks",
    url: APP_URL,
    siteName: "Smart Contract GPT",
    images: [
      {
        url: `${APP_URL}/opengraph-image.png`,
        alt: "Smart Contract GPT",
        width: 1450,
        height: 760,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    title: "Smart Contract GPT",
    description: "Write smart contract in any language and deploy to Stacks",
    site: APP_URL,
    images: [
      {
        url: `${APP_URL}/twitter-image.png`,
        alt: "Smart Contract GPT",
        width: 1450,
        height: 760,
      },
    ],
  },
  metadataBase: new URL(APP_URL),
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={cn("font-sans antialiased", fontSans.variable, fontMono.variable)}>
        <Toaster />
        <Providers attribute="class" defaultTheme="system" enableSystem>
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
