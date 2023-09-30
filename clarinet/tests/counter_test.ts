// counter_test.ts - a comprehensive unit test file
import { Clarinet, Tx, Chain, Account, Contract, types } from 'https://deno.land/x/clarinet@v1.0.2/index.ts';
import { assertEquals } from "https://deno.land/std@0.90.0/testing/asserts.ts";

Clarinet.test({
    name: "Ensure that counter can be incremented multiples per block, accross multiple blocks",
    async fn(chain: Chain, accounts: Map<string, Account>, contracts: Map<string, Contract>) {
        let wallet_1 = accounts.get("wallet_1")!;
        let wallet_2 = accounts.get("wallet_2")!; // multiple users

        let block = chain.mineBlock([
            Tx.contractCall("counter", "increment", [types.uint(1)], wallet_1.address),
            Tx.contractCall("counter", "increment", [types.uint(4)], wallet_1.address),
            Tx.contractCall("counter", "increment", [types.uint(10)], wallet_1.address)
        ]); // multiple contract calls

        assertEquals(block.height, 2); // asserting block height
        block.receipts[0].result // checking log for expected results
            .expectOk()
            .expectUint(2);
        block.receipts[1].result
            .expectOk()
            .expectUint(6);
        block.receipts[2].result
            .expectOk()
            .expectUint(16);

        block = chain.mineBlock([
            Tx.contractCall("counter", "increment", [types.uint(1)], wallet_1.address),
            Tx.contractCall("counter", "increment", [types.uint(4)], wallet_1.address),
            Tx.contractCall("counter", "increment", [types.uint(10)], wallet_1.address),
            Tx.transferSTX(1, wallet_2.address, wallet_1.address),
        ]); // more contract calls, and an STX transfer

        assertEquals(block.height, 3);
        block.receipts[0].result
            .expectOk()
            .expectUint(17);
        block.receipts[1].result
            .expectOk()
            .expectUint(21);
        block.receipts[2].result
            .expectOk()
            .expectUint(31); 

        let result = chain.getAssetsMaps(); // asserting account balances
        assertEquals(result.assets["STX"][wallet_1.address], 99999999999999);

        let call = chain.callReadOnlyFn("counter", "read-counter", [], wallet_1.address)
        call.result
            .expectOk()
            .expectUint(31); // asserting a final counter value

        "0x0001020304".expectBuff(new Uint8Array([0, 1, 2, 3, 4])); // asserting buffers
        "ST1HTBVD3JG9C05J7HBJTHGR0GGW7KXW28M5JS8QE.plaid-token".expectPrincipal('ST1HTBVD3JG9C05J7HBJTHGR0GGW7KXW28M5JS8QE.plaid-token'); // asserting principals
    },
});