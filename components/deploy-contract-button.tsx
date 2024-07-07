"use client";

import { useConnect } from "@stacks/connect-react";
import { AnchorMode } from "@stacks/transactions";
import { generateId } from "ai";

import { APP_URL } from "@/app/config";
import { Button } from "@/components/ui/button";
import { useAccount } from "@/lib/hooks/use-account";
import { getExplorerUrl, getNextPossibleNonce, nakamotoTestnet } from "@/lib/stacks";
import { DeploymentData } from "@/lib/types";

type DeployContractButtonProps = {
  getSourceCode: () => string;
  onFinishContractDeploy: (data: DeploymentData) => void;
};

export const DeployContractButton = ({ getSourceCode, onFinishContractDeploy }: DeployContractButtonProps) => {
  const { doContractDeploy } = useConnect();
  const { stxAddress } = useAccount();

  const deployContract = async () => {
    if (!stxAddress) return;
    const nextPossibleNonce = await getNextPossibleNonce(stxAddress);
    const contractName = "sc-gpt-" + generateId(4);
    doContractDeploy({
      appDetails: {
        name: "Smart Contract GPT",
        icon: `${APP_URL}/stacks.png`,
      },
      contractName,
      network: nakamotoTestnet,
      nonce: nextPossibleNonce,
      fee: 1_000_000,
      codeBody: getSourceCode(),
      anchorMode: AnchorMode.Any,
      onFinish: (txData) => {
        const { txId, stacksTransaction } = txData;
        const { chainId } = stacksTransaction;
        const deploymentData = {
          explorerUrl: getExplorerUrl(txId, chainId),
          contractName,
          network: "testnet",
        };
        onFinishContractDeploy(deploymentData);
      },
    });
  };

  return <Button onClick={deployContract}>Deploy</Button>;
};
