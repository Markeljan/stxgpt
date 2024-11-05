import { AccountsApi, Configuration } from "@stacks/blockchain-api-client";
import {
	StacksMainnet,
	type StacksNetworkName,
	StacksTestnet,
} from "@stacks/network";

export const nakamotoTestnet = new StacksTestnet();
export const nakamotoMainnet = new StacksMainnet();

export const getNetwork = (network: StacksNetworkName) =>
	network === "testnet" ? nakamotoTestnet : nakamotoMainnet;

const buildAccountsApi = (network: StacksNetworkName) => {
	const { coreApiUrl } = getNetwork(network);
	const config = new Configuration({ basePath: coreApiUrl });
	return new AccountsApi(config);
};

export const testnetAccountsApi = buildAccountsApi("testnet");
export const mainnetAccountsApi = buildAccountsApi("mainnet");

export const getNextPossibleNonce = async (
	address: string,
	network: StacksNetworkName,
) => {
	const accountsApi = buildAccountsApi(network);
	const { possible_next_nonce } = await accountsApi.getAccountNonces({
		principal: address,
	});

	return possible_next_nonce;
};

export const getExplorerUrl = (txId: string, network: StacksNetworkName) => {
	const networkDetails = getNetwork(network);
	return `https://explorer.hiro.so/txid/${txId}?chain=${networkDetails.chainId}&api=${networkDetails.coreApiUrl}`;
};

export const requestFaucetFunds = async (address: string) => {
	const response = await fetch(
		`${nakamotoTestnet.coreApiUrl}/extended/v1/faucets/stx?address=${address}&unanchored=true`,
		{
			method: "POST",
		},
	);
	const data: {
		success: boolean;
		txId: string;
		txRaw: string;
	} = await response.json();

	return data;
};
