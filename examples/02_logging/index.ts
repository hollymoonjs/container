import { Container, createContainer, run } from "@hollymoon/container";

import { log } from "@hollymoon/container/log";

function Message() {
    return {
        getMessage(moduleName: string, message: string) {
            return `[${moduleName}] ${message}`;
        },
    };
}

async function Module1({ inject }: Container) {
    const message = await inject(Message);

    console.log("Building module 1");

    return {
        async log() {
            console.log(message.getMessage("Module1", "Hello, World!"));
        },
    };
}

createContainer(
    run(async ({ get }) => {
        const module1 = get(Module1);

        await module1.log();
    }),
    Message,
    Module1,
    log()
);
