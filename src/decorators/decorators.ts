import { ComponentConfig, ComponentKey, ComponentRunner, init, run } from "../index";
import { createComponentDecorator } from "./decoratorFactories";
import { ContainerMetadata } from "./metadata";
import { toComponent } from "./toComponent";

export function Inject<T>(componentKey: ComponentKey<T>) {
    return function (ctx: any, name: string) {
        const metadata = ContainerMetadata.getMetadata(ctx.constructor);

        metadata.injections.push({ name, key: componentKey });
    };
}

export function Build() {
    return function (ctx: any, name: string) {
        const metadata = ContainerMetadata.getMetadata(ctx.constructor);

        metadata.buildMethods.push(async (obj, container) => {
            await obj[name](container);
        });
    };
}

export function Init() {
    return function (ctx: any, name: string) {
        const metadata = ContainerMetadata.getMetadata(ctx.constructor);

        metadata.runMethods.push({ runner: init, name });
    };
}

export function Run(runner?: (builder: ComponentRunner) => ComponentConfig) {
    return function (ctx: any, name: string) {
        const metadata = ContainerMetadata.getMetadata(ctx.constructor);

        metadata.runMethods.push({ runner: runner ?? run, name });
    };
}

export const Injectable = createComponentDecorator(() => toComponent);
