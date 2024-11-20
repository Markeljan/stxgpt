import { useConnect } from "@stacks/connect-react";
import { AnchorMode } from "@stacks/transactions";
import { generateId } from "ai";
import { DEPLOYMENT_URL } from "vercel-url";

import { Button } from "@/components/ui/button";
import { useAccount } from "@/lib/hooks/use-account";
import { getExplorerUrl, getNetwork, getNextPossibleNonce } from "@/lib/stacks";
import type { DeploymentData } from "@/lib/types";

type DeployContractButtonProps = {
	getSourceCode: () => string;
	onFinishContractDeploy: (data: DeploymentData) => void;
};

export const DeployContractButton = ({
	getSourceCode,
	onFinishContractDeploy,
}: DeployContractButtonProps) => {
	const { doContractDeploy } = useConnect();
	const { stxAddress, network } = useAccount();

	const deployContract = async () => {
		if (!stxAddress) return;
		const nextPossibleNonce = await getNextPossibleNonce(stxAddress, network);
		const contractName = `stxgpt-${generateId(4)}`;
		doContractDeploy({
			appDetails: {
				name: "STXGPT",
				icon: `${DEPLOYMENT_URL}/stacks.png`,
			},
			contractName,
			network: getNetwork(network),
			nonce: nextPossibleNonce,
			fee: 200_000,
			codeBody: getSourceCode(),
			anchorMode: AnchorMode.Any,
			onFinish: (txData) => {
				const { txId } = txData;
				const deploymentData = {
					explorerUrl: getExplorerUrl(txId, network),
					contractName,
					network,
				};

				onFinishContractDeploy(deploymentData);
			},
		});
	};

	return <Button onClick={deployContract}>Deploy</Button>;
};
