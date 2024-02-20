import { ChatRequest, FunctionCallHandler, nanoid } from "ai";
import { functionSchemas } from "@/lib/function-schemas";

const functionCallHandler: FunctionCallHandler = async (chatMessages, functionCall) => {
  if (functionCall.name === "deploy_contract") {
    const response = await fetch("/api/deploy-contract", {
      method: "POST",
      body: functionCall.arguments,
    });

    let content: string;
    let role: "system" | "function";

    const { networkName, txid, error, reason, reason_data } = await response.json();
    if (txid) {
      content = JSON.stringify({ networkName, txid });
      role = "function";
    } else {
      content = JSON.stringify({ error, reason, reason_data });
      role = "function";
    }

    const functionResponse: ChatRequest = {
      messages: [
        ...chatMessages,
        {
          id: nanoid(),
          name: "deploy_contract",
          role: role,
          content: content,
        },
      ],
      functions: functionSchemas,
    };

    return functionResponse;
  }
};

export default functionCallHandler;
