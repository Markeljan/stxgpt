import { type CoreTool, tool } from "ai";
import { z } from "zod";

import { deployContract } from "@/lib/deploy-contract";

export const toolSchemas: Record<string, CoreTool> = {
	deploy_contract: tool({
		description: "Deploy a Clarity smart contract to Stacks",
		parameters: z.object({
			networkName: z
				.enum(["testnet"])
				.describe(" Network to deploy the contract to")
				.optional()
				.default("testnet"),
			contractName: z
				.string()
				.describe("Name of the smart contract")
				.optional(),
			sourceCode: z
				.string()
				.describe("Clarity source code to be compiled and deployed"),
		}),
		execute: async ({ networkName, contractName, sourceCode }) => {
			return await deployContract({ networkName, contractName, sourceCode });
		},
	}),
};
