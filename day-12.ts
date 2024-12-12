type NaughtyList = 'Liam' | 'Aala';
type FormatNames<T extends Array<[string, "M" | "F", string]>> = {
  [K in keyof T]: {
    name: T[K][0];
    count: T[K][2] extends `${infer N extends number}` ? N : never;
    rating: T[K][0] extends NaughtyList ? "naughty" : "nice";
  }
};

import type { Expect, Equal } from 'type-testing';

type t0_actual = FormatNames<Names>['length'];
type t0_expected = 8;
type t0 = Expect<Equal<t0_actual, t0_expected>>;

type t1_actual = FormatNames<Names>[0]; 
type t1_expected = {                  
  name: 'Liam',
  count: 20802,
  rating: 'naughty'
};
type t1 = Expect<Equal<t1_actual, t1_expected>>;

type t2_actual = FormatNames<Names>[4]; 
type t2_expected = {                      
  name: 'Yanni',
  count: 19,
  rating: 'nice'
};
type t2 = Expect<Equal<t2_actual, t2_expected>>;

type t3_actual = FormatNames<Names>[3]; 
type t3_expected = {                     
  name: 'Petra',
  count: 148,
  rating: 'nice'
};
type t3 = Expect<Equal<t3_actual, t3_expected>>;

type t4_actual = FormatNames<Names>[6]; 
type t4_expected = {                      
  name: 'Aala',
  count: 5,
  rating: 'naughty'
};
type t4 = Expect<Equal<t4_actual, t4_expected>>;

type t5_actual = FormatNames<Names>[7];
type t5_expected = {
  name: 'Aagya',
  count: 5,
  rating: 'nice'
};
type t5 = Expect<Equal<t5_actual, t5_expected>>;

// a small dataset used here...
// data sourced from https://www.ssa.gov/oact/babynames/names.zip
export type Names = [
  ["Liam", "M", "20802"],
  ["Noah", "M", "18995"],
  ["Oliver", "M", "14741"],
  ["Petra", "F", "148"],
  ["Yanni", "M", "19"],
  ["Aalaiya", "F", "5"],
  ["Aala", "F", "5"],
  ["Aagya", "F", "5"],
]