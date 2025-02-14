import { Component, ComponentKey } from "./types";

export function componentKeyToString(key: ComponentKey<unknown>): string {
    if (typeof key === "string") {
        return key;
    } else if (typeof key === "symbol") {
        return key.description || key.toString();
    } else if (typeof key === "function") {
        return key.name;
    } else if (typeof key === "object" && "key" in key) {
        return componentKeyToString(key.key);
    } else {
        return key.toString();
    }
}

export function isComponent(value: unknown): value is Component<unknown> {
    if (!value || typeof value !== "object") {
        return false;
    }

    if (!("key" in value)) {
        return false;
    }

    if (
        "$$hollymoonComponent" in value &&
        value["$$hollymoonComponent"] === true
    ) {
        return true;
    }

    return false;
}
