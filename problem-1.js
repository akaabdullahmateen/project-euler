// Problem: Find the sum of multiples of 3 or 5 below 1000
// Solution: (sum of multiples of 3 below 1000) + (sum of multiples of 5 below 1000) - (sum of multiples of 15 below 1000)

// Sum of multiples of 3 below 1000 = 3 * (1 + 2 + 3 + ...) until 3 * n < 1000
// => n < 1000 / 3 => n < 333.3333 => n = 333 (Since n is a positive integer)
// Therefore, sum of multiples of 3 below 1000 = 3 * (1 + 2 + ... + 333)
// Sum of positive integers below 333, i.e., (1 + 2 + ... + 333) can be formulazied in two ways:
// Let S = 1 + 2 + ... + 333
// If we reverse the order of the summation inside S;
// S is also equal to (333 + 332 + ... + 1)
// Adding the ascending and descending versions of S together:
// S  =   1 +   2 + ... + 332 + 333
// S  = 333 + 332 + ... +   2 +   1
// 2S = 334 + 334 + ... + 334 + 334 = 334 * 333
// => S = (334 * 333) / 2
// In general:
// S  = 1 + 2       + ... + (n - 1) + n
// S  = n + (n - 1) + ... + 2       + 1
// 2S = (n + 1) + (n + 1) + ... + (n + 1) + (n + 1) = (n + 1) * n
// => S = ((n + 1) * n) / 2
// We can arrive at the same conclusion if we imagine this sum to be the multiplication of its average with its count.
// => S = (average) * (n)
// But; average = (n + 1) / 2 since it is an arithematic sequence
// Therefore, S = ((n + 1) * n) / 2
// For sum of multiples of 5 below 1000, we do the same thing:
// S = 5 * (1 + 2 + ... + n); where 5 * n < 1000 => n < 1000 / 2 => n < 200 => n = 199
// And again for sum of multiples of 15 below 1000:
// S = 15 * (1 + 2 + ... + n); where 15 * n < 1000 => n < 1000 / 15 => n < 66.6667 => n = 66

// Now to make the process less prone to typing errors, we can calculate n for each case through computation rather than hardcoding it.
// This also allows us to get solutions for different max values other than 1000.

// Since n < MAX_VALUE / c; where c = 3 or 5 or 15 depending on the case
// It can be speculated that: n = Math.floor(MAX_VALUE / c);
// However, this does not work when MAX_VALUE is an exact multiple of c;
// Therefore, we need to detect if MAX_VALUE is a multiple of c; if it is, then, n = (MAX_VALUE / c) - 1

function findN(maxValue, c) {
  // We do not need to care about cases where maxValue or c is a negative integer, since, that is out of the scope of this solution.
  // And is handled by the previous pipeline.
  // However, we do need to check if c is zero, as it can return INFINITY, or it is completely invalid, i.e., NaN or greater than MAX_SAFE_INTEGER.

  if (Number.isNaN(c) || c >= Number.MAX_SAFE_INTEGER || c === 0) {
    return 0;
  }

  // We can do this because "Any value that is not false, undefined, null, 0, -0, NaN, or the empty string (""), and any object,
  // including a Boolean object whose value is false, is considered truthy when used as the condition
  // Reference: MDN Docs (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else)

  if (!(maxValue % c)) {
    return maxValue / c - 1;
  }

  return Math.floor(maxValue / c);
}

function findSumOfMultiples(maxValue, c) {
  const n = findN(maxValue, c);
  return c * n * (n + 1) * 0.5;
}

// Original solution

/* function solution() {
  const maxValue = 1000;

  const sumOfMultiplesOf3Below1000 = findSumOfMultiples(maxValue, 3);
  const sumOfMultiplesOf5Below1000 = findSumOfMultiples(maxValue, 5);
  const sumOfMultiplesOf15Below1000 = findSumOfMultiples(maxValue, 15);

  const solution = sumOfMultiplesOf3Below1000 + sumOfMultiplesOf5Below1000 - sumOfMultiplesOf15Below1000;

  console.log(solution);
} */

// To generalize the solution for any two numbers (not necessarily 3 and 5), we need to calculate their lowest common multiple.
// To calculate their lowest common multiple: L.C.M = a * b / G.C.D
// To calculate G.C.D, we use the Euclidean algorithm, which says that the G.C.D of two numbers remains the same,
// if one of them is replaced by the difference of these two.

function gcd(a, b) {
  let t;

  while (b) {
    t = b;
    b = a % b;
    a = t;
  }

  return a;
}

function lcm(a, b) {
  // To prevent overflow that might happen if a and b are close to MAX_SAFE_INTEGER, we re-arranged the order of operation,
  // So that the parts of expressions that are computed in any instance remains small.

  return (a / gcd(a, b)) * b;
}

function findSumOfMultiplesOfAOrBBelowN(a, b, n) {
  const sumOfMultiplesOfABelowN = findSumOfMultiples(n, a);
  const sumOfMultiplesOfBBelowN = findSumOfMultiples(n, b);
  const sumOfMultiplesOfLCMBelowN = findSumOfMultiples(n, lcm(a, b));

  const sumOfMultiplesOfAOrBBelowN = sumOfMultiplesOfABelowN + sumOfMultiplesOfBBelowN - sumOfMultiplesOfLCMBelowN;

  console.log(sumOfMultiplesOfAOrBBelowN);
}

findSumOfMultiplesOfAOrBBelowN(3, 5, 1000);
