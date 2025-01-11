import { describe, expect, it, vi } from "vitest";
import { Init, Injectable } from "../../decorators/decorators";
import { createContainer } from "../../container";
import { events } from "@hollymoon/common";
import { inject } from "../../decorators/injectMarker";
import { OnEvent } from "../decoratorsExt";

describe("Events", () => {
    it("should call event handler", async () => {
        const onEvent = vi.fn();

        @Injectable()
        class Subject {
            public readonly myEvent = events.async<[number]>();

            @Init()
            async init() {
                await this.myEvent.emit(5);
            }
        }

        @Injectable()
        class Observer {
            private readonly subject = inject(Subject);

            @OnEvent((obj) => obj.subject.myEvent)
            async handle(v: number) {
                onEvent();
            }
        }

        await createContainer(Subject, Observer);

        expect(onEvent).toHaveBeenCalledOnce();
    });
});
