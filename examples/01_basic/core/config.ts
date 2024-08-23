import { provide } from "@hollymoon/container";

export const Config = provide(() => ({
    db: {
        host: "localhost",
        port: 3306,
        user: "root",
        password: "password",
    },
    smtp: {
        host: "smtp.example.com",
        port: 587,
    },
}));
