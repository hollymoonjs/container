---
type: lesson
title: Inject
focus: /index.ts

---

# Inject

You can use a provider from another component by injecting it.

Providers accept a parameter `container: Container` which has an `inject` method.

First let's create a `MessageProvider` to generate a message:

```typescript
function MessageProvider() {
    let messages = ["Hello World!", "Hola Mundo!", "Bonjour le monde!"];

    return {
        getMessage() {
            const idx = Math.floor(Math.random() * messages.length);
            return messages[idx];
        },
    };
}
```

Now we can modify our `HelloWorldProvider` to use the `MessageProvider`.

As you can see, the `inject` method is asynchronous, so we need to use `await` to get the provider. But this is not an issue, we can pass async functions to `createContainer` just like any other function.

```typescript
async function HelloWorldProvider(container: Container) {
    const messageProvider = await container.inject(MessageProvider);

    console.log(messageProvider.getMessage());
}
```

Finally to make it work, we need to register this container too in our `createContainer`:

```typescript
createContainer(
    HelloWorldProvider,
    MessageProvider,
)
```