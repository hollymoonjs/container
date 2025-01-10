import { describe, expect, it, vi } from "vitest";
import { Build, Injectable } from "../decorators";
import { createContainer } from "../../container";

describe("Build", () => {
    it("should call build function", async () => {
        const builder = vi.fn();

        @Injectable()
        class MyClass {
            @Build()
            build() {
                builder();
            }
        }

        await createContainer(MyClass);

        expect(builder).toHaveBeenCalledOnce();
    });
});
