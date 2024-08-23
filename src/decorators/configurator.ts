import { Component, Container } from "../types";
import { ContainerMetadata } from "./metadata";
import { Constructor } from "./types";

export function toConfigurator<T>(cls: Constructor<T>): Component<T> {
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
        async init(container: Container) {
            const obj = await container.inject(cls);
            for (const initMethod of metadata.initMethods) {
                await initMethod(obj, container);
            }
        },
        async run(container: Container) {
            const obj = await container.inject(cls);
            for (const runMethod of metadata.runMethods) {
                await runMethod(obj, container);
            }
        },
    };
}
