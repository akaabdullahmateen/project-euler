function solution(a, b, max) {
  let t;
  let sum = 0;

  while (!(b > max)) {
    if (!(b % 2)) {
      sum += b;
    }

    t = b;
    b += a;
    a = t;
  }

  return sum;
}

console.log(solution(1, 2, 4000000));
