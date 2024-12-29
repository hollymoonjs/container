import {
    ComponentKey,
    Container,
    ComponentRunner,
    ComponentConfig,
} from "../types";
import { ComponentConverter } from "./decoratorFactories";

export interface Injection {
    name: string;
    key: ComponentKey<unknown>;
}

export type BuildMethodCaller = (
    obj: any,
    container: Container
) => Promise<void>;

export class ContainerMetadata {
    componentConverter?: ComponentConverter;
    injections: Injection[] = [];

    buildMethods: BuildMethodCaller[] = [];
    runMethods: Array<{
        runner: (builder: ComponentRunner) => ComponentConfig;
        name: string;
    }> = [];

    static getMetadata(cls: any): ContainerMetadata {
        cls.$$containerMetadata ||= new ContainerMetadata();

        return cls.$$containerMetadata;
    }

    static hasMetadata(cls: any): boolean {
        return "$$containerMetadata" in cls;
    }
}
