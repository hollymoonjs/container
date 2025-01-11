export type MethodsWithSignature<TCtx extends object, TSig> = {
    [K in keyof TCtx]: TCtx[K] extends TSig ? K : never;
}[keyof TCtx];
