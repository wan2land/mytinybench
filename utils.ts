import { assertEquals } from "testing/asserts.ts";

export interface BenchCase<T> {
  name: string;
  baseline?: true;
  fn: () => T;
}

export function createBench<T>(group: string, cases: BenchCase<T>[]): void;
export function createBench<T>(cases: BenchCase<T>[]): void;
export function createBench<T>(
  groupOrCases: string | BenchCase<T>[],
  cases?: BenchCase<T>[],
) {
  let group: string | undefined;
  if (typeof groupOrCases === "string") {
    group = groupOrCases;
    cases = cases!;
  } else {
    cases = groupOrCases;
  }

  const baseCase = cases.find((c) => c.baseline);
  if (!baseCase) {
    throw new Error("No baseline case found");
  }
  const expected = baseCase.fn();
  for (const { name, baseline, fn } of cases) {
    let ignore = false;
    try {
      assertEquals(fn(), expected);
    } catch (e) {
      ignore = true;
      console.log(`case ${name} failed, ignored!`);
      console.log(e.message);
    }
    Deno.bench({
      name,
      ...group ? { group } : {},
      ignore,
      ...baseline ? { baseline: true } : {},
    }, () => {
      fn();
    });
  }
}
