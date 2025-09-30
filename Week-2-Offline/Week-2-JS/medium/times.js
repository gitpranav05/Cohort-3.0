function calculateTime(n) {
  const sta = performance.now();
  let j = 0;
  for (let i = 1; i <= n; i++) {
    j += i;
  }
  const end = performance.now();
  return (end - sta) / 1000;
}
