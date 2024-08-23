import { containerConfig } from "../configurators";
import { componentKeyToString } from "../helpers";

export const log = () =>
    containerConfig((container) => {
        container.config.beforeComponentBuild.push(async (_, component) => {
            console.log(
                `[HMC] Building component "${componentKeyToString(
                    component.key
                )}"`
            );
        });

        container.config.afterComponentBuild.push(async (_, component) => {
            console.log(
                `[HMC] Component "${componentKeyToString(component.key)}" built`
            );
        });

        container.config.beforeComponentInit.push(async (_, component) => {
            console.log(
                `[HMC] Initializing component "${componentKeyToString(
                    component.key
                )}"`
            );
        });

        container.config.afterComponentInit.push(async (_, component) => {
            console.log(
                `[HMC] Component "${componentKeyToString(
                    component.key
                )}" initialized`
            );
        });

        container.config.beforeComponentRun.push(async (_, component) => {
            console.log(
                `[HMC] Running component "${componentKeyToString(
                    component.key
                )}"`
            );
        });

        container.config.afterComponentRun.push(async (_, component) => {
            console.log(
                `[HMC] Component "${componentKeyToString(component.key)}" ran`
            );
        });
    });
