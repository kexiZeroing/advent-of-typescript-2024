type ResultType = { declared: string[], used: string[] }

type AnalyzeScope<Code, Acc extends ResultType = { declared: [], used: [] }> =
  Code extends `${' ' | '\n' | '\t'}${infer Rest}`
  ? AnalyzeScope<Rest, Acc>
  : Code extends `${"let" | "const" | "var"} ${infer ID} = ${string};\n${infer Rest}`
		? AnalyzeScope<Rest, { declared: [...Acc["declared"], ID], used: Acc["used"] }>
		: Code extends `${string}(${infer Id});\n${infer Rest}`
      ? AnalyzeScope<Rest, { declared: Acc["declared"], used: [...Acc["used"], Id] }>
			: Acc

// 1. Add another type parameter Acc to keep track of the result.
// 2. Remove all leading whitespaces before processing the code.
// 3. Use ${infer Rest} to capture the rest of the code.
// 4. Return Acc at the end if no match is found.


import type { Expect, Equal } from "type-testing";

type t0_actual = AnalyzeScope<`
let teddyBear = "standard_model";
`>;
type t0_expected =
  {
  declared: ["teddyBear"];
  used: [];
};
type t0 = Expect<Equal<t0_actual, t0_expected>>;

type t1_actual = AnalyzeScope<`
buildToy(teddyBear);
`>;
type t1_expected = {
  declared: [];
  used: ["teddyBear"];
};
type t1 = Expect<Equal<t1_actual, t1_expected>>;

type t2_actual = AnalyzeScope<`
let robotDog = "deluxe_model";
assembleToy(robotDog);
`>;
type t2_expected = {
  declared: ["robotDog"];
  used: ["robotDog"];
};
type t2 = Expect<Equal<t2_actual, t2_expected>>;

type t3_actual = AnalyzeScope<`
  let robotDog = "standard_model";
  const giftBox = "premium_wrap";
    var ribbon123 = "silk";
  
  \t
  wrapGift(giftBox);
  \r\n
      addRibbon(ribbon123);
`>;
type t3_expected = {
  declared: ["robotDog", "giftBox", "ribbon123"];
  used: ["giftBox", "ribbon123"];
};
type t3 = Expect<Equal<t3_actual, t3_expected>>;

type t4_input = "\n\t\r \t\r ";
type t4_actual = AnalyzeScope<t4_input>;
type t4_expected = {
  declared: [];
  used: [];
};
type t4 = Expect<Equal<t4_actual, t4_expected>>;
