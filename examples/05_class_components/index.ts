import { Inject, Injectable } from "@hollymoon/container/decorators";
import { createContainer, run } from "@hollymoon/container";

function LogService() {
    return {
        log(name: string, message: string) {
            console.log(`[${name}] ${message}`);
        },
    };
}

@Injectable()
class HelloWorldService {
    @Inject(LogService)
    private logService!: ReturnType<typeof LogService>;

    print() {
        this.logService.log("HelloWorld", "Hello world!");
    }
}

createContainer(
    HelloWorldService,
    LogService,
    run(async ({ get }) => {
        const helloWorldService = get(HelloWorldService);
        helloWorldService.print();
    })
);
