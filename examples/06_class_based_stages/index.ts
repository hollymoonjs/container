import { Injectable, Run } from "@hollymoon/container/decorators";
import { createStages } from "@hollymoon/container/stages";
import { createContainer } from "@hollymoon/container";

const stages = createStages("a", "b", "c");

@Injectable()
class StageRunner {
    @Run(stages.c)
    async runC() {
        console.log("Running stage C");
    }

    @Run(stages.a)
    async runA() {
        console.log("Running stage A");
    }

    @Run(stages.b)
    async runB() {
        console.log("Running stage B");
    }

    @Run()
    async run() {
        console.log("Running stage runner");
    }
}

createContainer(StageRunner);
