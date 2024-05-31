const isProd = process.env.NODE_ENV === "production";

// PUBLIC
export const APP_URL = isProd ? (process.env.NEXT_PUBLIC_APP_URL as string) : "http://localhost:3000";

// PRIVATE
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY as string;
export const DEPLOYER_PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY as string;
