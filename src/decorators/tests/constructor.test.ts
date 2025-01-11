import { describe, expect, it, vi } from "vitest";
import { Build, Inject, Injectable } from "../decorators";
import { createContainer } from "../../container";
import { provide } from "../../configurators";

describe("Build", () => {
    it("should inject from constructor", async () => {
        const ProviderA = provide(() => {
            return "A";
        });

        @Injectable()
        class MyClass {
            constructor(
                @Inject(ProviderA)
                a: string
            ) {
                expect(a).toBe("A");
            }
        }

        await createContainer(ProviderA, MyClass);
    });
});
