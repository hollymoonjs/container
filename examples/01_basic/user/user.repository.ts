import { Container } from "@hollymoon/container";
import { Database } from "../core";
import { User } from "./user.model";

export async function UserRepository({ inject }: Container) {
    const db = await inject(Database);

    return {
        async get(id: number) {
            return (await db.get(`user:${id}`)) as User;
        },
        async create(id: number, user: User) {
            await db.set(`user:${id}`, user);
        },
    };
}
