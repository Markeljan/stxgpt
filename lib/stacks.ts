import { AccountsApi, Configuration } from "@stacks/blockchain-api-client";
import { StacksTestnet } from "@stacks/network";
import { ChainID } from "@stacks/transactions";

const NAKAMOTO_TESTNET_API_URL = "https://api.nakamoto.testnet.hiro.so";

export const nakamotoTestnet = new StacksTestnet({
  url: NAKAMOTO_TESTNET_API_URL,
});

const config = new Configuration({
  basePath: NAKAMOTO_TESTNET_API_URL,
});
const accountsApi = new AccountsApi(config);

export const getNextPossibleNonce = async (address: string) => {
  const { possible_next_nonce } = await accountsApi.getAccountNonces({
    principal: address,
  });

  return possible_next_nonce;
};

export const requestFaucetFunds = async (address: string) => {
  const response = await fetch(
    `${NAKAMOTO_TESTNET_API_URL}/extended/v1/faucets/stx?address=${address}&unanchored=true`,
    {
      method: "POST",
    }
  );
  const data = (await response.json()) as { success: boolean; txId: string; txRaw: string };
  return data;
};

export const getExplorerUrl = (txId: string, chain: ChainID) => {
  const networkDetails =
    chain === ChainID.Testnet
      ? {
          chain: "testnet",
          api: NAKAMOTO_TESTNET_API_URL,
        }
      : {
          chain: "mainnet",
          api: "https://api.mainnet.hiro.so",
        };
  return `https://explorer.hiro.so/txid/${txId}?chain=${networkDetails.chain}&api=${networkDetails.api}`;
};
