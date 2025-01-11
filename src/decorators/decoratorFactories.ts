import { ComponentConfig, Container } from "../types";
import { ContainerMetadata } from "./metadata";
import { Constructor } from "./types";

export type ComponentConverter = (cls: Constructor<any>) => ComponentConfig;

export function createComponentDecorator<TArgs extends unknown[]>(
    builder: (...args: TArgs) => ComponentConverter
) {
    return function (...args: TArgs) {
        return function (cls: Function) {
            const metadata = ContainerMetadata.getMetadata(cls);

            metadata.componentConverter = builder(...args);
        };
    };
}

export type BuildMethod = (
    method: Function,
    container: Container,
    component: any
) => Promise<void>;

export function createBuildDecorator<
    TCtx extends object = any,
    TName extends keyof TCtx = any
>(builder: BuildMethod) {
    return function (ctx: TCtx, name: TName) {
        const metadata = ContainerMetadata.getMetadata(ctx.constructor);

        metadata.buildMethods.push(async (obj, container) => {
            await builder(obj[name].bind(obj), container, obj);
        });
    };
}
