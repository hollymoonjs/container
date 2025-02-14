import { createContainer } from "./container";
import { ComponentConfig, Namespace, ReadyContainer } from "./types";

export function namespace(...components: Array<ComponentConfig>): Namespace {
    let container: ReadyContainer | null = null;

    return {
        $$hollymoonComponent: true,
        key: Symbol("namespace"),
        build: async () => {
            container = await createContainer(...components);
            return container;
        },
        destroy: async () => {
            if (container) {
                await container.destroy();
            }
        },
    };
}
