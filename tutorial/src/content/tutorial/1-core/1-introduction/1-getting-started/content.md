---
type: lesson
title: Getting started
focus: /index.ts

---

# Getting started

`@hollymoon/container` is a library to help managing a large application.


## Providers

Providers are methods that return a service or any value. They get called when the container is initialized, and the return value is stored in the container.

```typescript
function HelloWorldProvider() {
  console.log("Hello World!");
}
```

We can add components to the container only when creating it, by passing .

```typescript
createContainer(
  HelloWorldProvider
)
```

*You cannot add or remove them dynamically on purpose. Container is supposed to be an app global container with singletons.*
