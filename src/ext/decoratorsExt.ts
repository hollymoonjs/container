import {
    AsyncEventHandlers,
    ReadableReactive,
    SyncEventHandlers,
} from "@hollymoon/common";
import { createBuildDecorator } from "../decorators/decoratorFactories";

type AnyEvent<TArgs extends unknown[]> =
    | AsyncEventHandlers<TArgs>
    | SyncEventHandlers<TArgs>;
type AnyEventGetter<TArgs extends unknown[]> = (obj: object) => AnyEvent<TArgs>;

export function OnEvent<TArgs extends unknown[]>(
    getter: AnyEventGetter<TArgs>
) {
    return createBuildDecorator(async (fn, _, obj) => {
        const event = getter(obj);
        event.on(fn as any);
    });
}

export interface OnReactiveChangeOptions {
    immediate?: boolean;
}

type ReactiveGetter<T> = (obj: object) => ReadableReactive<T>;

export function OnReactiveChange<T>(
    getter: ReactiveGetter<T>,
    options?: OnReactiveChangeOptions
) {
    return createBuildDecorator(async (fn, _, obj) => {
        const reactive = getter(obj);

        reactive.changeEvent.on(fn as any);

        if (options?.immediate) {
            fn(reactive.value);
        }
    });
}
