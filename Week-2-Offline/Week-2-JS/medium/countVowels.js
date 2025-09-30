function countVowels(str) {
  let vow = "aeiouAEIOU";
  let sum = 0;
  for (const ch of str) {
    if (vow.includes(ch)) sum++;
  }
  return sum;
}
