import { createContainer, init, run } from "@hollymoon/container";

const InitRunner = init(() => {
    console.log("Init");
});

function Provider() {
    console.log("Provider");
}

const Runner = run(() => {
    console.log("Runner");
});

createContainer(InitRunner, Provider, Runner);
