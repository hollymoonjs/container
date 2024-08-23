import { createContainer } from "./container";
import { ComponentConfig, Namespace } from "./types";

export function namespace(...components: Array<ComponentConfig>): Namespace {
    return {
        key: Symbol("namespace"),
        build: async () => {
            return await createContainer(...components);
        },
    };
}
