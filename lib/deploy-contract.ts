import { generateId } from "ai";

import type { StacksNetworkName } from "@stacks/network";
import {
	AnchorMode,
	type SignedContractDeployOptions,
	broadcastTransaction,
	getAddressFromPrivateKey,
	makeContractDeploy,
} from "@stacks/transactions";

import { DEPLOYER_PRIVATE_KEY } from "@/app/config";
import {
	getExplorerUrl,
	getNextPossibleNonce,
	nakamotoMainnet,
	nakamotoTestnet,
	requestFaucetFunds,
} from "@/lib/stacks";
import type { DeploymentData } from "@/lib/types";

type DeployContractParams = {
	networkName?: StacksNetworkName;
	contractName?: string;
	sourceCode: string;
};

export const deployContract = async ({
	networkName = "testnet",
	contractName = `scgpt-${generateId()}`,
	sourceCode,
}: DeployContractParams): Promise<
	| { error: string }
	| { explorerUrl: string; contractName: string; network: StacksNetworkName }
> => {
	const network = networkName === "testnet" ? nakamotoTestnet : nakamotoMainnet;

	const formattedContractName = contractName
		?.replace(/([a-z])([A-Z])/g, "$1-$2")
		?.toLowerCase();

	const senderAddress = getAddressFromPrivateKey(
		DEPLOYER_PRIVATE_KEY,
		network.version,
	);

	const nextPossibleNonce = await getNextPossibleNonce(
		senderAddress,
		networkName,
	);

	if (networkName === "testnet") {
		const { success } = await requestFaucetFunds(senderAddress);
		if (!success) {
			console.error("Faucet request failed");
		}
	}

	const txOptions: SignedContractDeployOptions = {
		senderKey: DEPLOYER_PRIVATE_KEY,
		contractName: formattedContractName,
		codeBody: sourceCode,
		clarityVersion: 2,
		network,
		nonce: nextPossibleNonce,
		anchorMode: AnchorMode.Any,
		fee: BigInt(200_000), // 0.2 STX
	};

	const transaction = await makeContractDeploy(txOptions);
	const broadcastResponse = await broadcastTransaction(
		transaction,
		nakamotoTestnet,
	);
	const { txid, error, reason, reason_data } = broadcastResponse;
	if (error) {
		console.error("Broadcast error", error, reason, reason_data);
		return {
			error: reason || error,
		};
	}

	const deploymentData: DeploymentData = {
		explorerUrl: getExplorerUrl(txid, networkName),
		contractName: formattedContractName,
		network: networkName,
	};
	return deploymentData;
};
