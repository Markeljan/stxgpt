'use client'

import React, { useEffect, useState } from "react";
import { AppConfig, showConnect, UserSession } from "@stacks/connect";

import { Button } from "@/components/ui/button";

const appConfig = new AppConfig(["store_write", "publish_data"]);
export const userSession: UserSession = new UserSession({ appConfig });

function authenticate() {
    showConnect({
        appDetails: {
            name: "Smart Contract GPT",
            icon: window.location.origin + "/stacks-logo.svg",
        },
        redirectTo: "/",
        onFinish: () => {
            window.location.reload();
        },
        userSession,
    });
}

function disconnect() {
    userSession.signUserOut("/");
}

const ConnectWallet = () => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    if (mounted && userSession.isUserSignedIn()) {
        return (
            <Button className="Connect" onClick={disconnect}>
                Disconnect Wallet
            </Button>
        );
    }

    return (
        <Button className="Connect" onClick={authenticate}>
            Connect Wallet
        </Button>
    );
};

export default ConnectWallet;
