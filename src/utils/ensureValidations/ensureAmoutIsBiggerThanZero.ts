export default async function ensureAmountIsBiggerThanZero(amount: number) {
  if (amount <= 0) {
    throw {
      type: "Bad_Request",
      message: "Amount should be bigger than zero!",
    };
  }

  return;
}
