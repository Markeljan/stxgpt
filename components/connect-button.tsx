"use client";

import { showConnect, useConnect } from "@stacks/connect-react";

import { Button } from "@/components/ui/button";
import { useUserSession } from "@/lib/hooks/use-user-session";

export const ConnectButton = () => {
  const { userSession } = useUserSession();
  const { authOptions } = useConnect();

  const handleLogin = () => {
    showConnect(authOptions);
  };

  function disconnect() {
    userSession?.signUserOut();
  }

  if (userSession?.isUserSignedIn()) {
    return (
      <Button className="Connect" onClick={disconnect}>
        Disconnect Wallet
      </Button>
    );
  }

  return (
    <Button className="Connect" onClick={handleLogin}>
      Connect Wallet
    </Button>
  );
};
