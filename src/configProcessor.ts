import { isComponent } from "./helpers";
import { Component, ComponentConfig } from "./types";

export function processConfig(
    config: ComponentConfig
): Array<Component<unknown>> {
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
        result.push({
            key: config,
            build: config,
        });
    }

    return result;
}
