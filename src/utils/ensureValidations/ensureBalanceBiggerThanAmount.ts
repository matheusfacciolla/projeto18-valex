export default async function ensureBalanceBiggerThanAmount(balance: number, amount: number) {
  if (amount > balance) {
    throw {
      type: "Bad_Request",
      message: "The card does not have enough balance!",
    };
  }

  return;
}
