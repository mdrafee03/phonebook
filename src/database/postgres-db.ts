import * as path from "path";
import { createConnection } from "typeorm";
import { config } from "dotenv";

config();
const baseDir = path.join(__dirname, "../");
const entitiesPath = `${baseDir}entity/**/*.{ts,js}`;

export const postgresDB = async () => {
  return await createConnection({
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    port: Number.parseInt(process.env.POSTGRES_PORT, 5432),
    entities: [entitiesPath],
    synchronize: true,
    logging: false,
  });
};
