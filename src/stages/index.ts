import { Component, ComponentRunner, Container } from "../types";

export type StageConfig = (runner: ComponentRunner) => Component<void>;

export type Stages<T extends Array<string>> = {
    [K in T[number]]: StageConfig;
};

export function createStages<TStages extends Array<string>>(
    ...stages: TStages
): Stages<TStages> {
    let stageRunners: Record<string, ComponentRunner[]> = {};

    let ran = false;
    async function runStages(container: Container) {
        if (ran) {
            return;
        }

        ran = true;

        for (const stage of stages) {
            if (!stageRunners[stage]) {
                continue;
            }

            for (const runner of stageRunners[stage]) {
                await runner(container);
            }
        }
    }

    const stageConfig: Record<string, StageConfig> = {};
    for (const stage of stages) {
        stageConfig[stage] = (runner) => {
            return {
                key: Symbol(stage),
                init: async () => {
                    stageRunners[stage] ||= [];
                    stageRunners[stage].push(runner);
                },
                run: runStages,
            };
        };
    }

    return stageConfig as Stages<TStages>;
}
