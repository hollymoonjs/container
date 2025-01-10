import { describe, expect, it, vi } from "vitest";
import { init, provide, run } from "../configurators";
import { createContainer } from "../container";
import { ReadyContainer } from "../types";

describe("provide", () => {
    it("should always run runner", async () => {
        const runner = vi.fn();

        await createContainer(run(runner));

        expect(runner).toHaveBeenCalledOnce();
    });

    it("should get provided values", async () => {
        const ProviderA = provide(() => {
            return "Provider A";
        });

        const runner = vi.fn(({ get }: ReadyContainer) => {
            const a = get(ProviderA);
            expect(a).toBe("Provider A");
        });

        await createContainer(ProviderA, run(runner));
    });

    it("should run after build and init", async () => {
        let callCount = 0;

        const builder = vi.fn(() => {
            expect(callCount).toBe(0);
            callCount++;
        });

        const initializer = vi.fn(() => {
            expect(callCount).toBe(1);
            callCount++;
        });

        const runner = vi.fn(() => {
            expect(callCount).toBe(2);
            callCount++;
        });

        await createContainer(run(runner), init(initializer), provide(builder));

        expect(callCount).toBe(3);
    });
});
