import { ComponentStore } from "./componentStore";
import { processConfig } from "./configProcessor";
import { createContainerConfig } from "./containerConfig";
import { currentContainer } from "./currentContainer";
import { ComponentNotFoundError, NamespaceNotFoundError } from "./errors";
import {
    ComponentConfig,
    ComponentKey,
    ReadyContainer,
    Namespace,
    Container,
} from "./types";

function parseInjectArgs<T>(
    namespaceOrKey: Array<Namespace> | ComponentKey<T>,
    key?: ComponentKey<T>
): [Array<Namespace>, ComponentKey<T>] {
    let namespaces: Array<Namespace> = [];
    if (key) {
        namespaces = namespaceOrKey as Array<Namespace>;
    } else {
        key = namespaceOrKey as ComponentKey<T>;
    }

    return [namespaces, key];
}

export async function createContainer(
    ...components: Array<ComponentConfig>
): Promise<ReadyContainer> {
    const componentStore = new ComponentStore();
    const resolvedComponentStore = new ComponentStore();

    const container: Container = {
        config: createContainerConfig(),
        inject: async <T>(
            namespaceOrKey: Array<Namespace> | ComponentKey<T>,
            _key?: ComponentKey<T>
        ) => {
            const [namespaces, key] = parseInjectArgs(namespaceOrKey, _key);

            if (namespaces.length === 0) {
                let resolved = resolvedComponentStore.get(key);
                if (resolved) {
                    return resolved.value;
                }

                // TODO: Check for circular dependencies
                let component = componentStore.get(key);
                if (!component) {
                    throw new ComponentNotFoundError(key);
                }

                resolvedComponentStore.add(component);
                componentStore.remove(key);

                const config = container.config;
                if (component.build) {
                    for (const beforeComponentBuild of config.beforeComponentBuild) {
                        await beforeComponentBuild(container, component);
                    }

                    component.value = await component.build(container);

                    for (const afterComponentBuild of config.afterComponentBuild) {
                        await afterComponentBuild(container, component);
                    }
                }

                for (const beforeInject of config.beforeInject) {
                    beforeInject(container, key, component);
                }

                const value = component.value;

                for (const afterInject of config.afterInject) {
                    afterInject(container, key, component);
                }

                return value!;
            } else {
                const namespace: ReadyContainer | undefined =
                    await container.inject(namespaces[0]);
                if (!namespace) {
                    throw new NamespaceNotFoundError(key);
                }

                return namespace.get(namespaces.slice(1), key);
            }
        },
    };

    const processedComponents = processConfig([components, currentContainer]);

    for (const component of processedComponents) {
        if (component.config) {
            await component.config(container);
        }
    }

    for (const component of processedComponents) {
        componentStore.add(component);
    }

    for (const component of processedComponents) {
        await container.inject(component.key);
    }

    const config = container.config;

    const readyContainer: ReadyContainer = {
        get: <T>(
            namespaceOrKey: Array<Namespace> | ComponentKey<T>,
            _key?: ComponentKey<T>
        ) => {
            const [namespaces, key] = parseInjectArgs(namespaceOrKey, _key);

            if (namespaces.length === 0) {
                let component = resolvedComponentStore.get(key);
                if (!component) {
                    throw new ComponentNotFoundError(key);
                }

                return component.value!;
            } else {
                const namespace: ReadyContainer | undefined =
                    readyContainer.get(namespaces[0]);
                if (!namespace) {
                    throw new NamespaceNotFoundError(key);
                }

                return namespace.get(namespaces.slice(1), key);
            }
        },
    };

    for (const component of processedComponents) {
        if (component.init) {
            for (const beforeComponentInit of config.beforeComponentInit) {
                await beforeComponentInit(readyContainer, component);
            }

            await component.init(readyContainer);

            for (const afterComponentInit of config.afterComponentInit) {
                await afterComponentInit(readyContainer, component);
            }
        }
    }

    for (const component of processedComponents) {
        if (component.run) {
            for (const beforeComponentRun of config.beforeComponentRun) {
                await beforeComponentRun(readyContainer, component);
            }

            await component.run(readyContainer);

            for (const afterComponentRun of config.afterComponentRun) {
                await afterComponentRun(readyContainer, component);
            }
        }
    }

    return readyContainer;
}
