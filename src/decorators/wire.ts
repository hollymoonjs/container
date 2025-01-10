import { Container, ReadyContainer } from "../types";
import { ContainerMetadata } from "./metadata";

export function wire<T extends object>(container: ReadyContainer, obj: T): T;
export function wire<T extends object>(
    container: Container,
    obj: T
): Promise<T>;
export function wire<T extends object>(
    container: Container | ReadyContainer,
    obj: T
): T | Promise<T> {
    if ("get" in container) {
        const metadata = ContainerMetadata.getMetadata(obj.constructor);

        for (const injection of metadata.injections) {
            (obj as any)[injection.name] = container.get(injection.key);
        }

        return obj;
    } else if ("inject" in container) {
        return (async function () {
            const metadata = ContainerMetadata.getMetadata(obj.constructor);

            for (const injection of metadata.injections) {
                (obj as any)[injection.name] = await container.inject(
                    injection.key
                );
            }

            return obj;
        })();
    }

    throw new Error("Invalid container");
}
