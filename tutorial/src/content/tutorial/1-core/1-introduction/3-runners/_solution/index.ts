import { createContainer, Container, run } from "@hollymoon/container";

function MessageProvider() {
    let messages = ["Hello World!", "Hola Mundo!", "Bonjour le monde!"];

    return {
        getMessage() {
            const idx = Math.floor(Math.random() * messages.length);
            return messages[idx];
        },
    };
}

async function HelloWorldProvider(container: Container) {
    const messageProvider = await container.inject(MessageProvider);

    console.log("Provider:", messageProvider.getMessage());
}

async function HelloWorldRunner(container: Container) {
    const messageProvider = await container.inject(MessageProvider);

    console.log("Runner:", messageProvider.getMessage());
}

createContainer(
    run(HelloWorldRunner),
    HelloWorldProvider, 
    MessageProvider
);
