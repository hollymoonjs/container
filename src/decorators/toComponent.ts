import { Component, Container, ReadyContainer } from "../types";
import { ContainerMetadata } from "./metadata";
import { Constructor } from "./types";

export function toComponent<T>(cls: Constructor<T>): Component<T> {
    const metadata = ContainerMetadata.getMetadata(cls);

    return {
        key: cls,
        async build(container: Container) {
            const obj: any = new cls();
            for (const injection of metadata.injections) {
                obj[injection.name] = await container.inject(injection.key);
            }

            for (const buildMethod of metadata.buildMethods) {
                await buildMethod(obj, container);
            }

            return obj;
        },
        async init(container: ReadyContainer) {
            const obj = container.get(cls);
            for (const initMethod of metadata.initMethods) {
                await initMethod(obj, container);
            }
        },
        async run(container: ReadyContainer) {
            const obj = container.get(cls);
            for (const runMethod of metadata.runMethods) {
                await runMethod(obj, container);
            }
        },
    };
}
