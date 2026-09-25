import "dotenv/config";
import "reflect-metadata";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { DataSource } from "typeorm";
import { Situations } from "./entity/Situations.js";
import { Users } from "./entity/Users.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
function requiredEnv(name) {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Variável ${name} não definida no arquivo .env`);
    }
    return value;
}
const dialect = process.env.DB_DIALECT ?? "mysql";
export const AppDataSource = new DataSource({
    type: dialect,
    host: process.env.DB_HOST ?? "localhost",
    port: Number(process.env.DB_PORT ?? 3306),
    username: requiredEnv("DB_USERNAME"),
    password: requiredEnv("DB_PASSWORD"),
    database: process.env.DB_DATABASE ?? "nodeapi",
    entities: [Users, Situations],
    subscribers: [],
    migrations: [path.join(__dirname, "migration", "*.js")],
    synchronize: false,
    logging: true,
});
//# sourceMappingURL=data-source.js.map