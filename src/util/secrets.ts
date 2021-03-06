import dotenv from "dotenv";
import fs from "fs";

if (fs.existsSync(".env")) {
    console.debug("Using .env file to supply config environment variables");
    dotenv.config({ path: ".env" });
} else {
    console.debug("Using .env.example file to supply config environment variables");
    dotenv.config({ path: ".env.example" });  // you can delete this after you create your own .env file!
}
export const ENVIRONMENT = process.env.NODE_ENV;
const prod = ENVIRONMENT === "production"; // Anything else is treated as 'dev'

export const SESSION_SECRET = process.env["SESSION_SECRET"] ? process.env["SESSION_SECRET"] : "SESSION_SECRET";

if (!SESSION_SECRET) {
    console.error("No client secret. Set SESSION_SECRET environment variable.");
    process.exit(1);
}

