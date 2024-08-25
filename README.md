# Introduction

`@hollymoon/container` is a library to help managing a large application.

## Installation

You can install the library using npm:

```bash
npm install @hollymoon/container
```

or yarn:

```bash
yarn add @hollymoon/container
```

or pnpm:

```bash
pnpm install @hollymoon/container
```

## Singletons

Defining singletons are a very famous antipattern, but they are a very easy solution for a lot of problems. They will eventually become issues, but until they do, they are very easy to define.

The idea is, we create a container, in which we can add components. These components will be singletons, but only in that container.

## Dependencies

The other big pain point is when the application becomes a big spaghetti. `authentication` module depends on `user` module to check if the user is valid. But if you want to change password, `user` needs to check if you are authenticated using `authentication`. This circular dependency is a very common issue, and it is usually solved by hacky workarounds.

The main issue is not necessarily the circular dependency, but the fact that the dependency is not explicit. You can't tell by looking at the code that `user` depends on `authentication`. You can't tell by looking at the code that `authentication` depends on `user`.

`@hollymoon/container` solves this issue by making the dependency explicit. You can't use a component   without defining its dependencies. This way, you can't have circular dependencies.

## Plug and Play

When you have independent components, you can have an awesome plug and play experience. You can add or remove features without worrying about breaking the application. You can even replace a component with another one, and the application will still work.

This library tries to help you designing your application in a way that you can easily replace components, or groups of components. You can even replace a component with a mock for testing purposes.

## Disclaimer

The library is in its experimental phase. Its API is not stable, there are a lot of things that might change or be removed.