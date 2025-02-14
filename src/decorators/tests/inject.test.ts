import { describe, expect, it } from "vitest";
import { Build, Inject, Injectable } from "../decorators";
import { createContainer } from "../../container";
import { wire } from "../wire";

describe("Inject decorator", () => {
    it("should inject based on decorator", async () => {
        function TestProvider() {
            return "test";
        }

        @Injectable()
        class MyClass {
            @Inject(TestProvider)
            private value!: string;

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
            @Inject(TestProvider)
            private value!: string;

            test() {
                expect(this.value).toBe("test");
            }
        }

        const container = await createContainer(TestProvider);

        wire(container, new MyClass()).test();
    });
});
