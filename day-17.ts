function compose<T1, T2, T3, T4>(
	f: (x: T1) => T2,
	g: (x: T2) => T3,
	h: (x: T3) => T4,
): (x: T1) => T4 {
	return (a) => h(g(f(a)));
}

const upperCase = <const T extends string>(x: T) => x.toUpperCase() as Uppercase<T>;
const lowerCase = <const T extends string>(x: T) => x.toLowerCase() as Lowercase<T>;

type FirstChar<T extends string> = T extends `${infer U}${string}` ? U : never;
type FirstItem<T extends any[]> = T extends [infer U, ...any[]] ? U : never;

const firstChar = <const T extends string>(x: T) => x[0] as FirstChar<T>;
const firstItem = <const T extends any[]>(x: T): T[0] => x[0] as FirstItem<T>;
//const firstItem = <const T extends any[]>(x: T): T extends [] ? never : T[0] => x[0];

const makeTuple = <T>(x: T): [T] => [x];
const makeBox = <T>(value: T): { value: T } => ({ value });


import type { Equal, Expect } from 'type-testing';

const t0 = compose(upperCase, makeTuple, makeBox)("hello!").value[0];
type t0_actual = typeof t0;    
type t0_expected = "HELLO!"; 
type t0_test = Expect<Equal<t0_actual, t0_expected>>;

const t1 = compose(makeTuple, firstItem, makeBox)("hello!" as const).value;
type t1_actual = typeof t1;    
type t1_expected = "hello!"; 
type t1_test = Expect<Equal<t1_actual, t1_expected>>;

const t2 = compose(upperCase, firstChar, lowerCase)("hello!");
type t2_actual = typeof t2;    
type t2_expected = "h"; 
type t2_test = Expect<Equal<t2_actual, t2_expected>>;
