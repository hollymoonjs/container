import { Container } from "@hollymoon/container";
import { Config } from "./config";

export async function Mail({ inject }: Container) {
    const config = await inject(Config);

    return {
        async send(to: string, subject: string, body: string) {
            console.log("[Mail] Sending email:", {
                smtp: config.smtp,
                to,
                subject,
                body,
            });
        },
    };
}
