import { describe, expect, it, vi } from "vitest";
import { createContainer } from "../container";
import { destroy, provide } from "../configurators";
import { currentContainer } from "../currentContainer";

describe("currentContainer", () => {
    it("should not call destroy runner before destroying", async () => {
        const onDestroy = vi.fn();

        await createContainer(destroy(onDestroy));

        expect(onDestroy).not.toHaveBeenCalled();
    });

    it("should call destroy function", async () => {
        const onDestroy = vi.fn();
        const container = await createContainer(destroy(onDestroy));

        await container.destroy();

        expect(onDestroy).toHaveBeenCalled();
    });

    it("should throw when getting value after destroy", async () => {
        const myProvider = provide(() => "value");
        const container = await createContainer(myProvider);

        await container.destroy();

        expect(() => container.get(myProvider)).toThrowError();
    });

    it("should throw when injecting value after destroy", async () => {
        const myProvider = provide(() => "value");
        const container = await createContainer(myProvider);
        const containerReference = container.get(currentContainer);

        await container.destroy();

        await expect(async () => {
            await containerReference.inject(myProvider);
        }).rejects.toThrowError();
    });
});
