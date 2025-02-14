import { describe, expect, it, vi } from "vitest";
import { Init, Injectable } from "../decorators";
import { createContainer } from "../../container";

describe("Init", () => {
    it("should call public init function", async () => {
        const initFn = vi.fn();

        @Injectable()
        class MyClass {
            @Init()
            init() {
                initFn();
            }
        }

        await createContainer(MyClass);

        expect(initFn).toHaveBeenCalledOnce();
    });

    it("should call private init function", async () => {
        const initFn = vi.fn();

        @Injectable()
        class MyClass {
            @Init()
            private init() {
                initFn();
            }
        }

        await createContainer(MyClass);

        expect(initFn).toHaveBeenCalledOnce();
    });
});
