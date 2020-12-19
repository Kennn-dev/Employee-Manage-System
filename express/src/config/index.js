import { config } from "dotenv";

const { parsed } = config();

export const { PORT } = parsed;

export const SECRETKEY = "shhhhhhhhhhh";
export const REFRESHKEY = "heythisisrefreshkey";
