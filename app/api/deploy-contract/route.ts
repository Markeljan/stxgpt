import {
  makeContractDeploy,
  broadcastTransaction,
  AnchorMode,
  getNonce,
  getAddressFromPrivateKey,
} from "@stacks/transactions";
import { StacksTestnet, StacksMainnet, StacksDevnet, StacksNetwork } from "@stacks/network";

export const runtime = "edge";

export async function POST(req: Request) {
  const json = await req.json();
  const { networkName = "testnet", contractName, sourceCode } = json;

  console.log("request received:", json);

  // mainnet disabled for now
  const network: StacksNetwork = new StacksTestnet();

  const formattedContractName = contractName?.replace(/([a-z])([A-Z])/g, "$1-$2")?.toLowerCase();
  const senderKey = process.env.DEPLOYER_PRIVATE_KEY as string;

  const senderAddress = getAddressFromPrivateKey(senderKey, network.version);

  const nonce = (await getNonce(senderAddress, network)) + BigInt(1);

  const txOptions = {
    contractName: formattedContractName || "smart-contract-gpt-contract",
    codeBody: sourceCode || COUNTER_CONTRACT,
    senderKey,
    network,
    nonce,
    anchorMode: AnchorMode.Any,
    fee: BigInt(3000),
  };

  try {
    const transaction = await makeContractDeploy(txOptions);
    console.log("transaction:", transaction);
    const broadcastResponse = await broadcastTransaction(transaction, network);
    console.log("broadcastResponse:", broadcastResponse);
    const { txid, error, reason, reason_data } = broadcastResponse;
    if (error) {
      return new Response(JSON.stringify({ error, reason, reason_data }), { status: 500 });
    }
    const deploymentData = {
      txid,
      contractName: formattedContractName,
      network: networkName,
    };
    console.log("deploymentData:", deploymentData);
    return new Response(JSON.stringify(deploymentData));
  } catch (error) {
    console.error("error in route:", error);
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
}

const COUNTER_CONTRACT = `;; counter
(define-data-var counter uint u1) ;; counter initialized to 1

(define-public (increment (step uint)) ;; increment counter, print new-val
    (let ((new-val (+ step (var-get counter)))) 
        (var-set counter new-val)
        (print { object: "counter", action: "incremented", value: new-val })
        (ok new-val)))

(define-public (decrement (step uint)) ;; decrement counter, print new-val
    (let ((new-val (- step (var-get counter)))) 
        (var-set counter new-val)
        (print { object: "counter", action: "decremented", value: new-val })
        (ok new-val)))

(define-read-only (read-counter) ;; read value of counter
    (ok (var-get counter)))`;
