// If `T extends U`, variance allows to know how F<T> and F<U> are related:
// - Covariant: F<T> extends F<U>
// - Contravariant: F<U> extends F<T>
// - Invariant: Neither covariant nor contravariant
// - Bivariant: F<T> extends F<U> and F<U> extends F<T>

// https://www.sandromaglione.com/articles/covariant-contravariant-and-invariant-in-typescript
// https://www.typescriptlang.org/docs/handbook/2/generics.html#variance-annotations

// e.g. covariant annotation
// interface Producer<out T> {
//   make(): T;
// }
// e.g. contravariant annotation
// interface Consumer<in T> {
//   consume: (arg: T) => void;
// }

// add invariant annotation here
type Demand<in out T> = {
  demand: T;
}

import type { Equal, Expect } from 'type-testing';

declare let demand1: Demand<unknown>;
declare let demand2: Demand<string>;
declare let demand3: Demand<'Immediate 4% Pay Increase'>;
declare let demand4: Demand<'3 Days Paid Time Off Per Year'>;

type t1 = Expect<Equal<typeof demand1, { demand: unknown }>>
demand1 = demand1;
// @ts-expect-error
demand1 = demand2;
// @ts-expect-error
demand1 = demand3;
// @ts-expect-error
demand1 = demand4;

type t2 = Expect<Equal<typeof demand2, { demand: string }>>
// @ts-expect-error
demand2 = demand1;
demand2 = demand2;
// @ts-expect-error
demand2 = demand3;
// @ts-expect-error
demand2 = demand4;

type t3 = Expect<Equal<typeof demand3, { demand: 'Immediate 4% Pay Increase' }>>
// @ts-expect-error
demand3 = demand1;
// @ts-expect-error
demand3 = demand2;
demand3 = demand3;
// @ts-expect-error
demand3 = demand4;

type t4 = Expect<Equal<typeof demand4, { demand: '3 Days Paid Time Off Per Year' }>>
// @ts-expect-error
demand4 = demand1;
// @ts-expect-error
demand4 = demand2;
// @ts-expect-error
demand4 = demand3;
demand4 = demand4;
