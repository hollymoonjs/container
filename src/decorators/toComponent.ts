import { ComponentConfig, Container } from "../types";
import { ContainerMetadata } from "./metadata";
import { Constructor } from "./types";

export function toComponent(cls: Constructor<any>): ComponentConfig {
    const metadata = ContainerMetadata.getMetadata(cls);

    const component = {
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
