import { describe, expect, it } from "vitest";
import { Build, Injectable } from "../decorators";
import { createContainer } from "../../container";
import { inject } from "../injectMarker";
import { wire } from "../wire";

describe("Inject marker", () => {
    it("should inject based on marker", async () => {
        function TestProvider() {
            return "test";
        }

        @Injectable()
        class MyClass {
            private value = inject(TestProvider);

            @Build()
            build() {
                expect(this.value).toBe("test");
            }
        }

        await createContainer(TestProvider, MyClass);
    });

    it("should inject using wire", async () => {
        function TestProvider() {
            return "test";
        }

        class MyClass {
            private value = inject(TestProvider);

            test() {
                expect(this.value).toBe("test");
            }
        }

        const container = await createContainer(TestProvider);

        wire(container, new MyClass()).test();
    });
});
