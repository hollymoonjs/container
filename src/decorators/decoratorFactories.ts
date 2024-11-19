import { ComponentConfig } from "../types";
import { ContainerMetadata } from "./metadata";
import { Constructor } from "./types";

export type ComponentConverter = (cls: Constructor<any>) => ComponentConfig;

export function createComponentDecorator<TArgs extends unknown[]>(builder: (...args: TArgs) => ComponentConverter) {
    return function (...args: TArgs) {
        return function (cls: Function) {
            const metadata = ContainerMetadata.getMetadata(cls);

            metadata.componentConverter = builder(...args);
        };
    };
}
