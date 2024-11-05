# STX GPT

Write smart contracts in any programming language and deploy them to the Stacks blockchain.
![chrome-capture-2023-9-3 (1)](https://github.com/Markeljan/stxgpt/assets/12901349/2157fb11-686c-4648-bcb5-6157b6cf8946)

## Overview

STXGPT is a tool designed to assist developers in deploying Clarity smart contracts to the Stacks blockchain. It's especially useful for those familiar with languages like Solidity or those new to the Stacks ecosystem. The tool aids in converting syntax and bridging knowledge gaps, making the onboarding process for Stacks smart contract developers smoother.

## Features

- **Code Conversion**: Convert and adapt smart contract code with the help of our AI chatbot.
- **Deployment Options**: Testnet only deployment for now.
- **Sponsored Deployment**: Deploy without needing a wallet using our sponsored deployment option.
- **REST API**: Use our publicly accessible API for deployments on testnet at `stxgpt.com`.

## How It Works

Built using Next.js, Vercel-AI, OpenAI, Stacks.js, and Clarinet, our chatbot is fine-tuned with SIP-009 smart contract examples. It guides users in writing and converting smart contract code. The Stacks JS library handles the deployment to the selected network.

## Setup & Configuration

To get started, you'll need to create a `.env.local`

```env.local
# App URL example: https://stxgpt.com
NEXT_PUBLIC_APP_URL=

# OpenAI API Key
OPENAI_API_KEY=

# Stacks deployer private key
DEPLOYER_PRIVATE_KEY=
```

## Challenges & Learnings

- Block Times: Long block times on testnet posed a challenge. We recommend setting up a devnet for a more optimal experience.
- Best Practices: Ensured up-to-date practices by incorporating SIP-009 examples from popular NFT contracts on Stacks.

## Technologies Used

Clarity
Next.js
OpenAI
React
Stacks
Stacks.js

## Links

- [Hosted App](stxgpt.com)
- [Bitcoin Olympics Hackathon submission](https://devpost.com/software/stxgpt)
- [Hiro Explorer Deployments](https://explorer.hiro.so/address/ST35TFTK3KTSTM6ZXX8232SDYREJYGPQJ7SKPZN9X?chain=testnet)
