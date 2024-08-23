import { toConfigurator, Inject, Build } from "@hollymoon/container/decorators";
import { createContainer, run } from "@hollymoon/container";

function LogService() {
    return {
        log(name: string, message: string) {
            console.log(`[${name}] ${message}`);
        },
    };
}

class HelloWorldService {
    @Inject(LogService)
    private logService: ReturnType<typeof LogService> = null!;

    @Build()
    async build() {
        this.print();
    }

    print() {
        this.logService.log("HelloWorld", "Hello world!");
    }
}

createContainer(toConfigurator(HelloWorldService), LogService);
