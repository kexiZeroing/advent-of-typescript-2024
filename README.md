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

## Advent of Typescript 2023
Advent of Typescript 2023 Solution Walkthrough from lihautan: https://www.youtube.com/watch?v=TSAp8cAcHQU

```ts
type Foo<T> = {
  [K in keyof T]: T[K]
}

type Reverse<T extends string> = 
  T extends `${infer First}${infer Rest}` ? `${Reverse<Rest>}${First}` : T;

type CreateArray<V extends string, Len extends number, Arr extends any[] = []> = 
  Arr['length'] extends Len ? Arr : CreateArray<V, Len, [...Arr, V]>;

type FindX<Arr extends any[], Val extends any[] = []> = 
  Arr extends [infer First, ...infer Rest] 
    ? First extends 'X' ? Val['length'] : FindX<Rest, [...Val, '']> 
    : never;

type FindXIn2D<
  Map extends any[][],
  Row extends any[] = [],
  Col extends any[] = []
> = Map[Row['length']][Col['length']] extends 'X'
  ? [Row['length'], Col['length']]
  : Col['length'] extends Map[0]['length'] 
    ? FindXIn2D<Map, [...Row, ''], []>
    : FindXIn2D<Map, Row, [...Col, '']>;
```
