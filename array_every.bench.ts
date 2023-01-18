import { createBench } from "./utils.ts";

const arrayBestCase = Array.from({ length: 1_000_000 }, () => false);
const arrayWorstCase = Array.from({ length: 1_000_000 }, () => true);
const arrayAverageCase = [
  ...Array.from({ length: 500_000 }, () => true),
  ...Array.from({ length: 500_000 }, () => false),
];

createBench("BaseCase", [
  {
    name: "for-syntax (best)",
    baseline: true,
    fn: () => {
      for (const v of arrayBestCase) {
        if (!v) {
          return false;
        }
      }
      return true;
    },
  },
  {
    name: "Array.prototype.every (best)",
    fn: () => {
      return arrayBestCase.every((v) => v);
    },
  },
]);

createBench("AverageCase", [
  {
    name: "for-syntax (average)",
    baseline: true,
    fn: () => {
      for (const v of arrayAverageCase) {
        if (!v) {
          return false;
        }
      }
      return true;
    },
  },
  {
    name: "Array.prototype.every (average)",
    fn: () => {
      return arrayAverageCase.every((v) => v);
    },
  },
]);

createBench("WorstCase", [
  {
    name: "for-syntax (worst)",
    baseline: true,
    fn: () => {
      for (const v of arrayWorstCase) {
        if (!v) {
          return false;
        }
      }
      return true;
    },
  },
  {
    name: "Array.prototype.every (worst)",
    fn: () => {
      return arrayWorstCase.every((v) => v);
    },
  },
]);
