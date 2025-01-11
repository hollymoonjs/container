import { describe, expect, it, vi } from "vitest";
import { Init, Injectable } from "../../decorators/decorators";
import { createContainer } from "../../container";
import { reactive } from "@hollymoon/common";
import { inject } from "../../decorators/injectMarker";
import { OnReactiveChange } from "../decoratorsExt";
import { MethodsWithSignature } from "../../decorators/helpers";

describe("Events", () => {
    it("should call change handler", async () => {
        const onEvent = vi.fn();

        @Injectable()
        class Subject {
            public readonly myValue = reactive.box(0);

            @Init()
            async init() {
                this.myValue.value = 1;
            }
        }

        @Injectable()
        class Observer {
            private readonly subject = inject(Subject);

            @OnReactiveChange((obj) => obj.subject.myValue)
            async value(v: number) {
                onEvent(v);
            }
        }

        await createContainer(Subject, Observer);

        expect(onEvent).toHaveBeenNthCalledWith(1, 1);
    });

    it("should call change handler immediately", async () => {
        const onEvent = vi.fn();

        @Injectable()
        class Subject {
            public readonly myValue = reactive.box(0);

            @Init()
            async init() {
                this.myValue.value = 1;
            }
        }

        @Injectable()
        class Observer {
            private readonly subject = inject(Subject);

            @OnReactiveChange((obj) => obj.subject.myValue, { immediate: true })
            async value(v: number) {
                onEvent(v);
            }
        }

        await createContainer(Subject, Observer);

        expect(onEvent).toHaveBeenNthCalledWith(1, 0);
        expect(onEvent).toHaveBeenNthCalledWith(2, 1);
    });
});
