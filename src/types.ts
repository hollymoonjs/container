import { ContainerConfig } from "./containerConfig";

export type Namespace = Component<ReadyContainer>;

export interface ComponentClass<T> {
    new (): T;
}

export interface MarkerComponentKey<T> extends Symbol {}

export type ComponentKey<T> =
    | string
    | MarkerComponentKey<T>
    | ComponentClass<T>
    | ComponentBuilder<T>
    | Component<T>;

export type ComponentBuilder<T> = (container: Container) => Promise<T> | T;

export type ConfigFunction = (container: Container) => Promise<void> | void;
export type ComponentRunner = (container: Container) => Promise<void> | void;

export interface Component<T> {
    key: ComponentKey<T>;
    config?: ConfigFunction;
    build?: ComponentBuilder<T>;
    value?: T;
    init?: ComponentRunner;
    run?: ComponentRunner;
}

export type ComponentType<T extends Component<unknown>> = T extends Component<
    infer U
>
    ? U
    : never;

export interface Container {
    config: ContainerConfig;
    inject<T>(namespace: Array<Namespace>, key: ComponentKey<T>): Promise<T>;
    inject<T>(key: ComponentKey<T>): Promise<T>;
}

export interface ReadyContainer {
    get<T>(namespace: Array<Namespace>, key: ComponentKey<T>): T;
    get<T>(key: ComponentKey<T>): T;
}

export type ComponentConfig =
    | Component<unknown>
    | ComponentBuilder<unknown>
    | Array<ComponentConfig>
    | { [key: string]: ComponentConfig };
