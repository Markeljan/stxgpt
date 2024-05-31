"use client";
import { useTransition } from "react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { IconMoon, IconSpinner, IconSun } from "@/components/ui/icons";
import { useIsClient } from "@/lib/hooks/use-is-client";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [_, startTransition] = useTransition();
  const isClient = useIsClient();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => {
        startTransition(() => {
          setTheme(resolvedTheme === "light" ? "dark" : "light");
        });
      }}
    >
      {isClient ? (
        <>
          {resolvedTheme === "light" ? <IconMoon className="transition-all" /> : <IconSun className="transition-all" />}
          <span className="sr-only">Toggle theme</span>
        </>
      ) : (
        <IconSpinner />
      )}
    </Button>
  );
}
