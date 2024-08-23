import { Container } from "@hollymoon/container";
import { Config } from "./config";

export async function Database({ inject }: Container) {
    const config = await inject(Config);

    console.log("[DB] Connecting to", config.db);

    const db = new Map<string, unknown>();

    return {
        async get(key: string) {
            return db.get(key);
        },
        async set(key: string, value: unknown) {
            db.set(key, value);
        },
    };
}
