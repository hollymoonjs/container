import { Component, ComponentKey, ReadyContainer, Container } from "./types";

export type ComponentHook<T> = (
    container: ReadyContainer | Container,
    component: Component<T>
) => Promise<void>;

export type InjectHook<T> = (
    container: ReadyContainer | Container,
    key: ComponentKey<T>,
    component: Component<T>
) => void;

export interface ContainerConfig {
    beforeComponentBuild: Array<ComponentHook<unknown>>;
    afterComponentBuild: Array<ComponentHook<unknown>>;
    beforeComponentInit: Array<ComponentHook<unknown>>;
    afterComponentInit: Array<ComponentHook<unknown>>;
    beforeComponentRun: Array<ComponentHook<unknown>>;
    afterComponentRun: Array<ComponentHook<unknown>>;

    beforeInject: Array<InjectHook<unknown>>;
    afterInject: Array<InjectHook<unknown>>;
}

export function createContainerConfig(): ContainerConfig {
    return {
        beforeComponentBuild: [],
        afterComponentBuild: [],
        beforeComponentInit: [],
        afterComponentInit: [],
        beforeComponentRun: [],
        afterComponentRun: [],
        beforeInject: [],
        afterInject: [],
    };
}
