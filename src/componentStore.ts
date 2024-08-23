import { ComponentExistsError } from "./errors";
import { Component, ComponentKey } from "./types";

function matchComponent<T>(
    key: ComponentKey<T>,
    component: Component<unknown>
): component is Component<T> {
    if (key === component) {
        return true;
    }

    if (component.key === key) {
        return true;
    }

    // Component key is a component itself
    if (typeof key === "object" && "key" in key && key.key !== key) {
        return matchComponent(key.key, component);
    }

    return false;
}

export class ComponentStore {
    private components: Array<Component<unknown>> = [];

    get<T>(key: ComponentKey<T>): Component<T> | null {
        const result = this.components.find((component) =>
            matchComponent(key, component)
        );
        if (result) {
            return result as Component<T>;
        }
        return null;
    }

    add<T>(component: Component<T>): void {
        const existing = this.get(component.key);
        if (existing) {
            throw new ComponentExistsError(component.key);
        }
        this.components.push(component);
    }

    remove<T>(key: ComponentKey<T>): void {
        this.components = this.components.filter(
            (component) => !matchComponent(key, component)
        );
    }

    list(): Array<Component<unknown>> {
        return this.components;
    }
}
