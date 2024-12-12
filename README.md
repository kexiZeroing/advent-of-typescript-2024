# Advent of TypeScript 2024

My solution to [Advent of TypeScript 2024](https://www.adventofts.com/events/2024).

## Setup
Use the TypeScript compiler to check types without emitting code. In your `tsconfig.json`, set `"noEmit": true`. Run `tsc` to check for type errors.

> When to use `ts-node`?
> 
> Use `ts-node` when you want to run TypeScript files directly without compiling them ahead of time. It's suitable for development, testing, and scripts where you want fast feedback cycles. `ts-node` also requires TypeScript to be installed in the project, either locally or globally, as it relies on the TypeScript compiler.

```sh
npm init -y
npm i -D typescript @types/node type-testing

npx tsc --init
# https://www.totaltypescript.com/tsconfig-cheat-sheet

touch day-1.ts
# ignores the tsconfig.json settings
npx tsc day-1.ts --noEmit
# or compiles based on the project tsconfig.json
npx tsc
```

## type-testing library
https://github.com/MichiganTypeScript/type-testing

```ts
const shoutItOutLoud = <T extends string>(str: T) => (
  `${str.toUpperCase() as Uppercase<T>}!!!` as const
);

import { Expect, Equal } from "type-testing";

const hello = shoutItOutLoud('hello');
type test_hello = Expect<Equal<typeof hello, 'HELLO!!!'>>;
```
