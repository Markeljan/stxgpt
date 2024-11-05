import { useMemo } from "react";

import { useLocalStorage } from "@/lib/hooks/use-local-storage";
import { useUserSession } from "@/lib/hooks/use-user-session";

export const useAccount = () => {
	const { userSession } = useUserSession();
	const [network, setNetwork] = useLocalStorage<"mainnet" | "testnet">(
		"network",
		"mainnet",
	);

	return useMemo((): {
		isSignedIn: boolean;
		network: "mainnet" | "testnet";
		stxAddress?: string;
		setNetwork?: (network: "mainnet" | "testnet") => void;
	} => {
		const isSignedIn = userSession?.isUserSignedIn() ?? false;

		if (!isSignedIn) return { isSignedIn, stxAddress: undefined, network };

		const userData = userSession?.loadUserData();
		const stxAddress = userData?.profile.stxAddress[network];
		return { isSignedIn, stxAddress, network, setNetwork };
	}, [userSession, network, setNetwork]);
};
