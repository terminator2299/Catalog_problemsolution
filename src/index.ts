import fs from "node:fs";
import path from "node:path";
import type { Data, Root } from "./types";

(async () => {
  const file = path.resolve(__dirname, "input.json");
  const obj: Data = JSON.parse(fs.readFileSync(file, "utf8"));
  console.log(obj);

  // Extract n and k values
  const n = obj.keys.n;
  const k = obj.keys.k;
  console.log("n:", n, "k:", k);

  const roots = extract_roots(obj);
  console.log(roots);
  const constantTerm = lagrangeInterpolation(roots.x, roots.y);
  console.log("Constant term", constantTerm);
})();

function extract_roots(obj: Data) {
  const X: Array<number> = [];
  const Y: Array<number> = [];
  const roots = Object.keys(obj)
    .filter((key) => !isNaN(Number(key)))
    .map((key) => {
      const base = parseInt((obj[key] as Root).base);
      const value = (obj[key] as Root).value;
      const y = parseInt(value, base);
      const x = parseInt(key);
      X.push(x);
      Y.push(y);
      //   return { x, y };
    });

  return {
    x: X,
    y: Y,
  };
}

function lagrangeInterpolation(xValues: number[], yValues: number[]) {
  const L = (k: number, x: number) => {
    let result = 1;
    for (let m = 0; m < xValues.length; m++) {
      if (m !== k) {
        result *= (x - xValues[m]) / (xValues[k] - xValues[m]);
      }
    }
    return result;
  };

  const polynomial = (x: number) => {
    return yValues.reduce((acc, y, k) => acc + y * L(k, x), 0);
  };

  return polynomial(0); 
}
