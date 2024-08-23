import {
    ComponentKey,
    Container,
    createContainer,
    namespace,
    provide,
    run,
} from "@hollymoon/container";

interface Config {
    name: string;
}

const configKey: ComponentKey<Config> = Symbol("config");

const printName = run(async ({ inject }: Container) => {
    const config = await inject(configKey);
    console.log("Running:", config.name);
});

const namespace1 = namespace(
    provide(configKey, () => ({
        name: "Namespace 1",
    })),
    printName
);

const namespace2_1 = namespace(
    provide(configKey, () => ({
        name: "Namespace 2.1",
    })),
    printName
);

const namespace2 = namespace(
    provide(configKey, () => ({
        name: "Namespace 2",
    })),
    printName,
    namespace2_1
);

createContainer(
    namespace1,
    namespace2,
    provide(configKey, () => ({
        name: "Root namespace",
    })),
    printName,
    run(async ({ inject }: Container) => {
        const innerConfig = await inject([namespace2, namespace2_1], configKey);

        console.log("Inner config:", innerConfig.name);
    })
);
