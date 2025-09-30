function findLargestElement(numbers) {
  let n = numbers.length;
  if (n === 0) return undefined;

  let a = numbers[0];

  for (let i = 1; i < n; i++) {
    if (numbers[i] > a) a = numbers[i];
  }
  return a;
}
