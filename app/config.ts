declare global {
	namespace NodeJS {
		interface ProcessEnv {
			OPENAI_API_KEY: string;
			DEPLOYER_PRIVATE_KEY: string;
		}
	}
}

export const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
export const DEPLOYER_PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY;
