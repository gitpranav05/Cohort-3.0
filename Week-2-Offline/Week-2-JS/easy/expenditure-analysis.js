function calculateTotalSpentByCategory(transactions) {
  const mpp = new Map();
  const res = [];

  transactions.forEach((transaction) => {
    const { category, price } = transaction;
    if (mpp.has(category)) {
      mpp.set(category, (mpp.get(category) || 0) + price);
    } else {
      mpp.set(category, price);
    }
  });

  for (const [category, totalSpent] of mpp.entries()) {
    res.push({ category, totalSpent });
  }

  return res;
}
