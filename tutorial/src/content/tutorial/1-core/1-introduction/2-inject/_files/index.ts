import { createContainer } from "@hollymoon/container";

function HelloWorldProvider() {
    console.log("Hello World!");
}

createContainer(HelloWorldProvider);
