import { createContainer, run } from "@hollymoon/container";

function MessageProvider() {
    return {
        getMessage(moduleName: string, message: string) {
            return `[${moduleName}] ${message}`;
        },
    };
}

createContainer(
    MessageProvider,
    run(async ({ inject }) => {
        const message = await inject(MessageProvider);

        console.log(message.getMessage("Module1", "Hello, World!"));
    })
);
