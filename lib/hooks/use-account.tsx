import { useEffect, useState } from "react";

import { useUserSession } from "@/lib/hooks/use-user-session";

export const useAccount = () => {
  const [stxAddress, setStxAddress] = useState<string>();
  const [isSignedIn, setIsSignedIn] = useState<boolean>();
  const { userSession } = useUserSession();

  useEffect(() => {
    if (userSession) {
      const userData = userSession.loadUserData();
      if (userData) {
        setStxAddress(userData.profile.stxAddress.testnet);
        setIsSignedIn(true);
      } else {
        setIsSignedIn(false);
      }
    }
  }, [userSession]);

  return { isSignedIn, stxAddress };
};
