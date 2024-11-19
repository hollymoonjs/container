import { ComponentConverter, ContainerMetadata } from "./metadata";

export function createComponentDecorator<TArgs extends unknown[]>(builder: (...args: TArgs) => ComponentConverter) {
    return function (...args: TArgs) {
        return function (cls: Function) {
            const metadata = ContainerMetadata.getMetadata(cls);

            metadata.componentConverter = builder(...args);
        };
    };
}
