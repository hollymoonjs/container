import { ComponentKey } from "./types";

export class NamespaceNotFoundError extends Error {
    constructor(key: ComponentKey<unknown>) {
        super(`Namespace not found: ${key.toString()}`);
    }
}

export class ComponentNotFoundError extends Error {
    constructor(key: ComponentKey<unknown>) {
        super(`Component not found: ${key.toString()}`);
    }
}

export class ComponentExistsError extends Error {
    constructor(key: ComponentKey<unknown>) {
        super(`Component already exists: ${key.toString()}`);
    }
}
