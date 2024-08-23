import { createContainer } from "@hollymoon/container";
import { createStages } from "@hollymoon/container/stages";

const stages = createStages("config", "route", "fallback", "listen");

createContainer(
    stages.route(() => {
        console.log("Route stage");
    }),
    stages.listen(() => {
        console.log("Listen stage");
    }),
    stages.fallback(() => {
        console.log("Fallback stage");
    }),
    stages.config(() => {
        console.log("Config stage");
    })
);
