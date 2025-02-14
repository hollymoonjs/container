import { Component, ComponentConfig, Container } from "../types";
import { ContainerMetadata } from "./metadata";
import { Constructor } from "./types";
import { wire } from "./wire";

export function toComponent(cls: Constructor<any>): ComponentConfig {
    const metadata = ContainerMetadata.getMetadata(cls);

    const component: Component<any> = {
        $$hollymoonComponent: true,
        key: cls,
        async build(container: Container) {
            const params = [];
            for (const builder of metadata.constructorParams) {
                if (!builder) {
                    throw new Error(`Unknown parameter for ${cls.name}`);
                }
                params.push(await builder(container));
            }

            const obj = await wire(container, new cls(...params));

            for (const buildMethod of metadata.buildMethods) {
                await buildMethod(obj, container);
            }

            return obj;
        },
    };

    const configs: ComponentConfig[] = [component];

    for (const runMethod of metadata.runMethods) {
        configs.push(
            runMethod.runner(async (container) => {
                const obj = container.get(cls);
                await obj[runMethod.name](container);
            })
        );
    }

    return configs;
}
