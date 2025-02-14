import { describe, expect, it } from "vitest";
import { createContainer } from "../container";
import { currentContainer } from "../currentContainer";

describe("currentContainer", () => {
    it("should get the current container", async () => {
        await createContainer(async (container) => {
            const current = await container.inject(currentContainer);

            expect(current).toBe(container);
        });
    });
});
