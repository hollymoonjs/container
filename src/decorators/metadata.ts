import { ComponentKey, ReadyContainer, Container, Component } from "../types";
import { Constructor } from "./types";

export interface Injection {
    name: string;
    key: ComponentKey<unknown>;
}

export type MethodCaller = (obj: any, container: ReadyContainer | Container) => Promise<void>;

export type ComponentConverter = (type: Constructor<any>) => Component<any>;

export class ContainerMetadata {
    componentConverter?: ComponentConverter;
    injections: Injection[] = [];
    buildMethods: MethodCaller[] = [];
    initMethods: MethodCaller[] = [];
    runMethods: MethodCaller[] = [];

    static getMetadata(cls: any): ContainerMetadata {
        cls.$$containerMetadata ||= new ContainerMetadata();

        return cls.$$containerMetadata;
    }

    static hasMetadata(cls: any): boolean {
        return cls.$$containerMetadata instanceof ContainerMetadata;
    }
}
