---
type: lesson
title: Runners
focus: /index.ts

---

# Runners

Providers can depend on each other, and the dependent provider will always run first. But outside of this, the order of execution is not guaranteed.

However, sometimes you need to run some code after all providers have been initialized. I.e. in an express app, you'll always want the middlewares to be registered before the routes. In this case you can use a runner.

Let's create a simple runner that logs a message to the console. It will look exactly like a provider.

```typescript
async function HelloWorldRunner(container: Container) {
    const messageProvider = await container.inject(MessageProvider);

    console.log("Runner:", messageProvider.getMessage());
}
```

Now to register the first function as a runner in the container, you have to wrap it in the `run` method from the library:

```typescript
import { createContainer, run } from "@hollymoon/container";

createContainer(
    run(HelloWorldRunner),
    HelloWorldProvider,
    MessageProvider,
)
```

As you can see, no matter what, the runner will always run after all providers have been initialized.
