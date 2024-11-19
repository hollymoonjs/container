import { ContainerMetadata } from "./decorators/metadata";
import { isComponent } from "./helpers";
import { Component, ComponentBuilder, ComponentConfig } from "./types";

export function processConfig(config: ComponentConfig): Array<Component<unknown>> {
    let result: Array<Component<unknown>> = [];

    if (Array.isArray(config)) {
        for (const item of config) {
            result.push(...processConfig(item));
        }
    } else if (typeof config === "object") {
        if (isComponent(config)) {
            result.push(config);
        } else {
            result.push(...processConfig(Object.values(config)));
        }
    } else if (typeof config === "function") {
        const hasMetadata = ContainerMetadata.hasMetadata(config);
        if (hasMetadata) {
            const metadata = ContainerMetadata.getMetadata(config);
            if (metadata.componentConverter) {
                result.push(...processConfig(metadata.componentConverter(config as any)));
            }
        } else {
            result.push({
                key: config,
                build: config as ComponentBuilder<unknown>,
            });
        }
    }

    return result;
}
