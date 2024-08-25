---
type: lesson
title: Lifecycle
focus: /index.ts

---

# Lifecycle

The application has 3 phases:

 - `build` is when all the providers get built, and their dependencies get resolved.
 - `init` is when the init runners get executed.
 - `run` is when the normal runners get executed.

The order of these are guaranteed, but the order within each phase is not.

Let's write an init runner that logs "Init" to the console. You can do this by wrapping the function in `init`, similarly to `run`.

```typescript
const InitRunner = init(() => {
    console.log("Init");
});
```

Let's do a similar provider, and a runner:

```typescript
function Provider() {
    console.log("Provider");
}

const Runner = run(() => {
    console.log("Runner");
})
```

Now let's register them in our `createContainer`:

```typescript
createContainer(
    InitRunner,
    Provider,
    Runner,
)
```

You can see, no matter what you do, the order of execution is always `Provider`, `Init`, `Runner`.