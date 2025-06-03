import { assertStrictEquals } from "https://deno.land/std@0.224.0/assert/assert_strict_equals.ts";

export function minesweeper(input: string): string {
  if (input === "") return "";

  const rows = input.split("\n");
  const height = rows.length;
  const width = rows[0].length;

  let result: string[] = [];

  for (let y = 0; y < height; y++) {
    let line = "";
    for (let x = 0; x < width; x++) {
      if (rows[y][x] === "*") {
        line += "*";
      } else {
        let count = 0;

        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            if (dy === 0 && dx === 0) continue; 

            const newY = y + dy;
            const newX = x + dx;

            if (
              newY >= 0 &&
              newY < height &&
              newX >= 0 &&
              newX < width &&
              rows[newY][newX] === "*"
            ) {
              count++;
            }
          }
        }

        line += count.toString();
      }
    }
    result.push(line);
  }

  return result.join("\n");
}


Deno.test("Case vide", () => {
  assertStrictEquals(minesweeper(""), "");
});

Deno.test("Un seul point", () => {
  assertStrictEquals(minesweeper("."), "0");
});

Deno.test("Une seule mine", () => {
  assertStrictEquals(minesweeper("*"), "*");
});

Deno.test("Une ligne simple", () => {
  assertStrictEquals(minesweeper(".*."), "1*1");
});

