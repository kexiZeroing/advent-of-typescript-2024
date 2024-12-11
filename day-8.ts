declare namespace NodeJS {
  interface ProcessEnv {
    MOOD_LIGHTS: "true";
    BATH_TEMPERATURE: "327.59";
    STRAWBERRIES: "chocolate";
  }
}

import type { Expect, Equal } from "type-testing";

// process.env is typically typed as `string | undefined` by default.

const { MOOD_LIGHTS } = process.env as { MOOD_LIGHTS: "true" };;
type t0_actual = typeof MOOD_LIGHTS;
type t0_expected = "true";
type t0 = Expect<Equal<t0_actual, t0_expected>>;

const { BATH_TEMPERATURE } = process.env as { BATH_TEMPERATURE: "327.59" };
type t1_actual = typeof BATH_TEMPERATURE;
type t1_expected = "327.59";
type t1 = Expect<Equal<t1_actual, t1_expected>>;

const { STRAWBERRIES } = process.env as { STRAWBERRIES: "chocolate" };
type t2_actual = typeof STRAWBERRIES;
type t2_expected = "chocolate";
type t2 = Expect<Equal<t2_actual, t2_expected>>;
