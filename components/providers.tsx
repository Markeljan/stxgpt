"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { AuthOptions, Connect } from "@stacks/connect-react";

import { TooltipProvider } from "@/components/ui/tooltip";
import { APP_URL } from "@/app/config";
import { useUserSession } from "@/lib/hooks/use-user-session";

const appDetails = {
  name: "STXGPT",
  icon: `${APP_URL}/stacks.png`,
};

export function Providers({ children, ...props }: ThemeProviderProps) {
  const { setUserSession } = useUserSession();

  const authOptions: AuthOptions = {
    appDetails,
    onFinish({ userSession: newSession }) {
      setUserSession(newSession);
    },
  };
  return (
    <Connect authOptions={authOptions}>
      <NextThemesProvider {...props}>
        <TooltipProvider>{children}</TooltipProvider>
      </NextThemesProvider>
    </Connect>
  );
}
