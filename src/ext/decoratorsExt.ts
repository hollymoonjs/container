import {
    AsyncEventHandlers,
    ReadableReactive,
    SyncEventHandlers,
} from "@hollymoon/common";
import { createBuildDecorator } from "../decorators/decoratorFactories";
import { MethodsWithSignature } from "../decorators/helpers";

type AnyEvent<TArgs extends unknown[]> =
    | AsyncEventHandlers<TArgs>
    | SyncEventHandlers<TArgs>;
type AnyEventGetter<TArgs extends unknown[], TCtx> = (
    obj: TCtx
) => AnyEvent<TArgs>;

export function OnEvent<
    TArgs extends unknown[],
    TCtx extends object,
    TName extends MethodsWithSignature<
        TCtx,
        (...args: TArgs) => void | Promise<void>
    >
>(getter: AnyEventGetter<TArgs, TCtx>) {
    return createBuildDecorator<TCtx, TName>(async (fn, _, obj) => {
        const event = getter(obj);
        event.on(fn as any);
    });
}

export interface OnReactiveChangeOptions {
    immediate?: boolean;
}

type ReactiveGetter<T, TCtx> = (obj: TCtx) => ReadableReactive<T>;

export function OnReactiveChange<
    T,
    TCtx extends object,
    TName extends MethodsWithSignature<TCtx, (value: T) => void | Promise<void>>
>(getter: ReactiveGetter<T, TCtx>, options?: OnReactiveChangeOptions) {
    return createBuildDecorator<TCtx, TName>(async (fn, _, obj) => {
        const reactive = getter(obj);

        reactive.changeEvent.on(fn as any);

        if (options?.immediate) {
            fn(reactive.value);
        }
    });
}
