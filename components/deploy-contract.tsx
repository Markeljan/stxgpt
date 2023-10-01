'use client'

import React, { useEffect, useState } from "react";
import { useConnect } from "@stacks/connect-react";
import { StacksDevnet, StacksNetwork, StacksTestnet } from "@stacks/network";
import {
    AnchorMode,
} from "@stacks/transactions";
import { userSession } from "@/components/connect-wallet";
import { Button } from "./ui/button";

const DeployContractButton = ({ sourceCode }: { sourceCode: string }) => {
    const { doContractDeploy } = useConnect();

    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const network: StacksNetwork = new StacksTestnet()

    function deploy() {
        doContractDeploy({
            appDetails: {
                name: 'Smart Contract GPT',
                icon: 'https://smart-contract-gpt.vercel.app/stacks-logo.svg',
            },
            contractName: 'smart-contract-gpt-contract',
            codeBody: sourceCode || COUNTER_CONTRACT,
            network,
            anchorMode: AnchorMode.Any,
            onFinish: data => {
                console.log("doContractDeploy onFinish data:", data)
            },
            onCancel: () => {
                console.log("doContractDeploy onCancel")
            },
        });
    }

    if (!mounted || !userSession.isUserSignedIn()) {
        return null;
    }

    return (
        <Button onClick={() => deploy()}>
            Deploy
        </Button>
    );
};

export default DeployContractButton;

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
    (ok (var-get counter)))`