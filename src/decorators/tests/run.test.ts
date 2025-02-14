import { describe, expect, it, vi } from "vitest";
import { Injectable, Run } from "../decorators";
import { createContainer } from "../../container";

describe("Run", () => {
    it("should call public run function", async () => {
        const runFn = vi.fn();

        @Injectable()
        class MyClass {
            @Run()
            run() {
                runFn();
            }
        }

        await createContainer(MyClass);

        expect(runFn).toHaveBeenCalledOnce();
    });

    it("should call private run function", async () => {
        const runFn = vi.fn();

        @Injectable()
        class MyClass {
            @Run()
            private run() {
                runFn();
            }
        }

        await createContainer(MyClass);

        expect(runFn).toHaveBeenCalledOnce();
    });
});
