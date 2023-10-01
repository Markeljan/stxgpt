'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ThemeProviderProps } from 'next-themes/dist/types'

import { TooltipProvider } from '@/components/ui/tooltip'
import { Connect } from '@stacks/connect-react'

import { userSession } from '@/components/connect-wallet'

export function Providers({ children, ...props }: ThemeProviderProps) {
    let icon;
    if (typeof window !== "undefined") {
        icon = window.location.origin + "/nft-logo.png";
    }
    return (
        <Connect
            authOptions={{
                appDetails: {
                    name: "Smart Contract GPT",
                    icon: icon || '',
                },
                redirectTo: "/",
                onFinish: () => {
                    window.location.reload();
                },
                userSession,
            }}
        >
            <NextThemesProvider {...props} >
                <TooltipProvider>{children}</TooltipProvider>
            </NextThemesProvider>
        </Connect>
    )
}