import { describe, expect, it, vi } from "vitest";
import { provide, init } from "../configurators";
import { createContainer } from "../container";
import { ReadyContainer } from "../types";

describe("provide", () => {
    it("should always run init runner", async () => {
        const runner = vi.fn();

        await createContainer(init(runner));

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

        await createContainer(ProviderA, init(runner));
    });

    it("should run after build", async () => {
        let callCount = 0;

        const builder = vi.fn(() => {
            expect(callCount).toBe(0);
            callCount++;
        });

        const runner = vi.fn(() => {
            expect(callCount).toBe(1);
            callCount++;
        });

        await createContainer(init(runner), provide(builder));

        expect(callCount).toBe(2);
    });
});
