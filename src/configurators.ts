import {
    Component,
    ComponentBuilder,
    ComponentConfig,
    ComponentKey,
    ComponentRunner,
    ConfigFunction,
    Container,
    ReadyContainer,
} from "./types";

export function provide<T>(
    key: ComponentKey<T>,
    builder: ComponentBuilder<T>
): Component<T>;
export function provide<T>(builder: ComponentBuilder<T>): Component<T>;
export function provide<T>(
    keyOrValue: ComponentKey<T> | ComponentBuilder<T>,
    builder?: ComponentBuilder<T>
): Component<T> {
    let key: ComponentKey<T>;
    if (builder) {
        key = keyOrValue as ComponentKey<T>;
    } else {
        builder = keyOrValue as ComponentBuilder<T>;
        key = Symbol("anonymous");
    }

    return { $$hollymoonComponent: true, key, build: builder };
}

export function run(runner: ComponentRunner): Component<void> {
    return {
        $$hollymoonComponent: true,
        key: Symbol("run"),
        run: runner,
    };
}

export function init(runner: ComponentRunner): Component<void> {
    return {
        $$hollymoonComponent: true,
        key: Symbol("init"),
        init: runner,
    };
}

export function containerConfig(configure: ConfigFunction): Component<void> {
    return {
        $$hollymoonComponent: true,
        key: Symbol("config"),
        config: configure,
    };
}

export function destroy(runner: ComponentRunner): Component<void> {
    return {
        $$hollymoonComponent: true,
        key: Symbol("destroy"),
        destroy: runner,
    };
}

export function parent(parent: ReadyContainer) {
    return containerConfig((container) => {
        container.config.parent = parent;
    });
}

export function defineConfig(...configs: ComponentConfig[]) {
    return configs;
}
