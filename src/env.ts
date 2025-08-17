import z from "zod";
import dotenv from "dotenv";

dotenv.config();

const env = z.object({
    AUTH_SECRET: z.string(),
    AUTH_GOOGLE_ID: z.string(),
    AUTH_GOOGLE_SECRET: z.string(),
});



export default env.parse(process.env);
