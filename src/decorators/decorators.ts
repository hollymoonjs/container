import { ComponentKey } from "../index";
import { ContainerMetadata } from "./metadata";

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

        metadata.initMethods.push(async (obj, container) => {
            await obj[name](container);
        });
    };
}

export function Run() {
    return function (ctx: any, name: string) {
        const metadata = ContainerMetadata.getMetadata(ctx.constructor);

        metadata.runMethods.push(async (obj, container) => {
            await obj[name](container);
        });
    };
}
