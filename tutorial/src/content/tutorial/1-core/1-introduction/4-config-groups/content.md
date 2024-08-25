---
type: lesson
title: Config groups
focus: /index.ts

---

# Config groups

The args we pass in `createContainer` are called configs. We can group them together in a config group.

This is useful when you have a folder with `index.ts` files that export the providers, and you want to register them all at once.

Config groups are created with `defineConfig`. They can be nested, and you can pass them to `createContainer` just like any other config.

## Example

We have `user` directory with user related providers:

 - `UserRepository`: Stores and retrieves users from an object.
 - `UserService`: Uses the repository to create higher level business logic with them.

Now we just have to create an `user/index.ts` for them:

```typescript
import { defineConfig } from "@hollymoon/container";
import { UserRepository } from "./UserRepository";
import { UserService } from "./UserService";

export default defineConfig(
    UserRepository,
    UserService,
);
```

And then we can register them in our `createContainer` in `index.ts`:

```typescript
import { createContainer } from "@hollymoon/container";
import user from "./user";

createContainer(
    user,
);
```

And to see it in action, let's create a simple runner:

```typescript
import { UserService } from "./user/UserService";

createContainer(
    run(async (container) => {
        const userService = await container.inject(UserService);

        const user = await userService.register({
            email: "john.doe@gmail.com",
            name: "John Doe",
        })

        console.log(user);
    })
)
```

Don't forget to register it in the `createContainer`.
