---
type: lesson
title: So why do we need this?
editor: false
terminal: false

---

# So why do we need this?

### Why not just call the function?

We still import `UserService` to inject it in the runner, so this might seem useless. Why can't we simply call the function when we need it?

And the answer is, that way every time you need the service, you create a new one. This way you cannot have a global state. I.e. you cannot have an id generator that increments every time you create a new user.

Here the we will call `UserService` only once during the initialization of the container, and inject the same return value every time.

### Why not just export the `UserService` directly?

The other question that may arise is, why not just not export the return value of `UserService` function directly? Why do we need an extra function that returns it?

This seems like an unnecessary complication, but it has a lot of benefits. Or more precisely, direct exporting is basically a singleton pattern built into the language, and singletons are well known to be an anti-pattern for many reasons.

For example, this way you can have multiple containers per app, so you can crate many instances of the same service with different configurations. This is very useful in testing, or you can create a shell for your application easily this way.

Also, you can have a higher order function that creates the provider with custom logic. I.e. you can create a `yamlConfigProvider` function that will read a yaml file and return the config object. And you can pass in extra parameters to this function to specify the file path:

```typescript
import { createContainer } from "@hollymoon/container";
import { yamlConfigProvider } from "./helpers/configProviders";

const YamlConfig = yamlConfigProvider("config.yaml");

createContainer(
    YamlConfig,
    async (container) => {
        const config = await container.inject(YamlConfig);
    }
);
```