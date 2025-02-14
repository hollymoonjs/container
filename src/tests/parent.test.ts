import { describe, expect, it } from "vitest";
import { createContainer } from "../container";
import { parent, provide } from "../configurators";

describe("parent", () => {
    it("should resolve key from parent container", async () => {
        function MyValue() {
            return "value";
        }

        const container = await createContainer(MyValue);

        await createContainer(parent(container), async ({ inject }) => {
            const value = await inject(MyValue);
            expect(value).toBe("value");
        });
    });

    it("should shadow parent key", async () => {
        function MyValue() {
            return "value";
        }

        const container = await createContainer(MyValue);

        await createContainer(
            parent(container),
            provide(MyValue, () => "shadowed value"),
            async ({ inject }) => {
                const value = await inject(MyValue);
                expect(value).toBe("shadowed value");
            }
        );
    });

    it("should throw if it cannot be resolved", async () => {
        function MyValue() {
            return "value";
        }

        const container = await createContainer();

        await createContainer(parent(container), async ({ inject }) => {
            await expect(async () => {
                await inject(MyValue);
            }).rejects.toThrowError();
        });
    });

    it("should resolve own components", async () => {
        function MyValue() {
            return "value";
        }

        const container = await createContainer();

        await createContainer(
            MyValue,
            parent(container),
            async ({ inject }) => {
                const value = await inject(MyValue);
                expect(value).toBe("value");
            }
        );
    });
});
