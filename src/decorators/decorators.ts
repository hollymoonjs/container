import {
    ComponentConfig,
    ComponentKey,
    ComponentRunner,
    destroy,
    init,
    run,
} from "../index";
import {
    createBuildDecorator,
    createComponentDecorator,
} from "./decoratorFactories";
import { ContainerMetadata } from "./metadata";
import { toComponent } from "./toComponent";

export function Inject<T>(componentKey: ComponentKey<T>) {
    function decorator(ctx: any, _: undefined, parameterIndex: number): void;
    function decorator(ctx: any, name: string): void;
    function decorator(
        ctx: any,
        name: string | undefined,
        parameterIndex?: number
    ) {
        if (typeof name === "string" && typeof parameterIndex !== "number") {
            const metadata = ContainerMetadata.getMetadata(ctx.constructor);
            metadata.injections.push({ name, key: componentKey });
        } else if (typeof parameterIndex === "number") {
            const metadata = ContainerMetadata.getMetadata(ctx);
            for (
                let i = metadata.constructorParams.length;
                i <= parameterIndex;
                i++
            ) {
                metadata.constructorParams.push(null);
            }

            metadata.constructorParams[parameterIndex] = async (container) => {
                return await container.inject(componentKey);
            };
        }
    }

    return decorator;
}

export function Build() {
    return createBuildDecorator((fn, container) => fn(container));
}

export function Init() {
    return function (ctx: object, name: any) {
        const metadata = ContainerMetadata.getMetadata(ctx.constructor);

        metadata.runMethods.push({ runner: init, name: name as string });
    };
}

export function Run(runner?: (builder: ComponentRunner) => ComponentConfig) {
    return function (ctx: object, name: any) {
        const metadata = ContainerMetadata.getMetadata(ctx.constructor);

        metadata.runMethods.push({
            runner: runner ?? run,
            name: name as string,
        });
    };
}

export function Destroy() {
    return function (ctx: object, name: any) {
        const metadata = ContainerMetadata.getMetadata(ctx.constructor);

        metadata.runMethods.push({
            runner: destroy,
            name: name as string,
        });
    };
}

export const Injectable = createComponentDecorator(() => toComponent);
