"use client";

import { useEffect, useState } from "react";

import { AppConfig, UserSession } from "@stacks/connect-react";

import { useIsClient } from "@/lib/hooks/use-is-client";

export const useUserSession = () => {
  const [userSession, setUserSession] = useState<UserSession>();

  const isClient = useIsClient();

  useEffect(() => {
    if (isClient && !userSession) {
      const appConfig = new AppConfig(["store_write", "publish_data"]);
      const userSession = new UserSession({ appConfig });
      setUserSession(userSession);
    }
  }, [isClient]);

  return { userSession, setUserSession };
};
