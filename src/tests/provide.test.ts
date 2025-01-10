import { describe, expect, it, vi } from "vitest";
import { provide } from "../configurators";
import { createContainer } from "../container";

describe("provide", () => {
    it("should always provide value", async () => {
        const builder = vi.fn();

        await createContainer(provide(builder));

        expect(builder).toHaveBeenCalledOnce();
    });

    it("should provide value to container", async () => {
        const ProviderA = provide(() => {
            return "Provider A";
        });

        await createContainer(ProviderA, async ({ inject }) => {
            const a = await inject(ProviderA);
            expect(a).toBe("Provider A");
        });
    });

    it("should build the provided value only once", async () => {
        const builder = vi.fn(() => {
            return "Provider A";
        });
        const ProviderA = provide(builder);

        await createContainer(
            ProviderA,
            async ({ inject }) => {
                await inject(ProviderA);
            },
            async ({ inject }) => {
                await inject(ProviderA);
            }
        );

        expect(builder).toHaveBeenCalledOnce();
    });
});
