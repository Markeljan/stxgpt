"use client";
import { useTransition } from "react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { IconMoon, IconSpinner, IconSun } from "@/components/ui/icons";
import { useIsMounted } from "@/lib/hooks/use-is-mounted";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [_, startTransition] = useTransition();
  const isMounted = useIsMounted();

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
      {isMounted() ? (
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
