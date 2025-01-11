import { ComponentKey } from "../types";

export function inject<T>(key: ComponentKey<T>): T {
    return {
        $$inject: key,
    } as T;
}
