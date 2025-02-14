import { describe, expect, it, vi } from "vitest";
import { Destroy, Injectable } from "../decorators";
import { createContainer } from "../../container";

describe("Build", () => {
    it("should call public destroy function", async () => {
        const destroyFn = vi.fn();

        @Injectable()
        class MyClass {
            @Destroy()
            destroy() {
                destroyFn();
            }
        }

        const container = await createContainer(MyClass);

        await container.destroy();

        expect(destroyFn).toHaveBeenCalledOnce();
    });

    it("should call private destroy function", async () => {
        const destroyFn = vi.fn();

        @Injectable()
        class MyClass {
            @Destroy()
            private destroy() {
                destroyFn();
            }
        }

        const container = await createContainer(MyClass);

        await container.destroy();

        expect(destroyFn).toHaveBeenCalledOnce();
    });
});
