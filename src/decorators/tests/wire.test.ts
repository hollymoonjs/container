import { describe, it, expect } from "vitest";
import { provide } from "../../configurators";
import { Inject } from "../decorators";
import { createContainer } from "../../container";
import { wire } from "../wire";
import { inject } from "../injectMarker";

describe("wire", () => {
    it("should wire a class with ready container", async () => {
        const ProviderA = provide(() => {
            return "Provider A";
        });

        class ClassToWire {
            @Inject(ProviderA)
            providerA!: string;
        }

        const container = await createContainer(ProviderA);

        const wired = wire(container, new ClassToWire());

        expect(wired.providerA).toBe("Provider A");
    });

    it("should wire a class with pending container", async () => {
        const ProviderA = provide(() => {
            return "Provider A";
        });

        class ClassToWire {
            @Inject(ProviderA)
            providerA!: string;
        }

        await createContainer(ProviderA, async (container) => {
            const wired = await wire(container, new ClassToWire());

            expect(wired.providerA).toBe("Provider A");
        });
    });

    it("should wire a class with markers", async () => {
        const ProviderA = provide(() => {
            return "Provider A";
        });

        class ClassToWire {
            providerA = inject(ProviderA);
        }

        await createContainer(ProviderA, async (container) => {
            const wired = await wire(container, new ClassToWire());

            expect(wired.providerA).toBe("Provider A");
        });
    });
});
