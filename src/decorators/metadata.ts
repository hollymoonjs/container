import { ComponentKey, ReadyContainer, Container } from "../types";

export interface Injection {
    name: string;
    key: ComponentKey<unknown>;
}

export type MethodCaller = (
    obj: any,
    container: ReadyContainer | Container
) => Promise<void>;

export class ContainerMetadata {
    injections: Injection[] = [];
    buildMethods: MethodCaller[] = [];
    initMethods: MethodCaller[] = [];
    runMethods: MethodCaller[] = [];

    static getMetadata(cls: any): ContainerMetadata {
        cls.__containerMetadata ||= new ContainerMetadata();

        return cls.__containerMetadata;
    }
}
