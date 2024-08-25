---
type: lesson
title: Components
focus: /index.ts

editor: false
terminal: false
---

# Components

Providers, runners, and init runners are all components. They are the building blocks of the container.

## Key

All components have a key, which is used to identify them in the container. This key can be a class, a function, a symbol, or a string.

When we use the `provide` or `run` functions, we are creating a component with a key automatically provided.

This key is usually the function itself, or a symbol.

## Value

When you inject a component from another, you actually get the value of that component.

If this doesn't exist, the container will try to build it using the builder function.

Runners don't have a value, they are just executed. Providers on the other hand, provide a builder function, which builds the value when executed.
