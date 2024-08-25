import { createContainer, provide, run } from "@hollymoon/container";

function MessageProvider() {
    return {
        getMessage(moduleName: string, message: string) {
            return `[${moduleName}] ${message}`;
        },
    };
}

const mockMessageProvider = {
    getMessage: (moduleName: string, message: string) => {
        console.log("Mocked message provider called with", moduleName, message);
    },
};

createContainer(
    provide(MessageProvider, () => mockMessageProvider),
    run(async ({ inject }) => {
        const message = await inject(MessageProvider);

        console.log(message.getMessage("Module1", "Hello, World!"));
    })
);
