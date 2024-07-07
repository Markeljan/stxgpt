import { useMemo } from "react";
import { useUserSession } from "@/lib/hooks/use-user-session";

export const useAccount = () => {
  const { userSession } = useUserSession();

  return useMemo(() => {
    const isSignedIn = userSession?.isUserSignedIn() ?? false;
    let stxAddress: string | undefined;

    if (isSignedIn && userSession) {
      const userData = userSession.loadUserData();
      stxAddress = userData?.profile.stxAddress.mainnet;
    }

    return { isSignedIn, stxAddress };
  }, [userSession]);
};
