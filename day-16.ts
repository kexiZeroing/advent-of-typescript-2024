declare function DynamicParamsCurrying<
  ArgList extends unknown[],
  Output extends unknown
>(fn: (...args: ArgList) => Output):
  <T extends unknown[]>(...args: T) =>
    ArgList["length"] extends 0 ? Output :
    ArgList extends [...T, ...infer Tail]
      ? ReturnType<typeof DynamicParamsCurrying<Tail, Output>>
      : never;

/***
 * `fn: (...args: ArgList) => Output` is the function being passed to DynamicParamsCurrying.
 * The return type of DynamicParamsCurrying is a function that takes an array of arguments 
 * where T can be any array. It will return either:
 * 1. The final output type, when all arguments are passed. (no more parameters are needed)
 * 2. Or, a curried version of itself, waiting for more arguments, 
 * 
 * Example walk through:
 * DynamicParamsCurrying(originalCurry)
 * Here, `ArgList` is [number, string, boolean, Date], and `Output` is true.
 * 
 * Call spikedCurry(0)
 * - The first call to spikedCurry(0) passes only 0, so T is [number] and RemainingArgs is [string, boolean, Date].
 * - The return type of this partial call is DynamicParamsCurrying<[string, boolean, Date], true>
 * 
 */ 


const originalCurry = (
  ingredient1: number,
  ingredient2: string,
  ingredient3: boolean,
  ingredient4: Date,
) => true;

const spikedCurry = DynamicParamsCurrying(originalCurry);

// Direct call
const t0 = spikedCurry(0, "Ziltoid", true, new Date());

// Partially applied
const t1 = spikedCurry(1)("The", false, new Date());

// Another partial
const t2 = spikedCurry(0, "Omniscient", true)(new Date());

// You can keep callin' until the cows come home: it'll wait for the last argument
const t3 = spikedCurry()()()()(0, "Captain", true)()()()(new Date());

// currying is ok
const t4 = spikedCurry("Spectacular", 0, true);

// @ts-expect-error arguments provided in the wrong order
const e0 = spikedCurry("Nebulo9", 0, true)(new Date());
