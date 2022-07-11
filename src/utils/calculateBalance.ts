import * as rechargeRepository from "../repositories/rechargeRepository.js";
import * as paymentRepository from "../repositories/paymentRepository.js";

export default async function calculateBalance(cardId: number) {
  const transactions = await paymentRepository.findByCardId(cardId);
  const recharges = await rechargeRepository.findByCardId(cardId);

  let sumRecharges = 0;
  let sumTransactions = 0;
  recharges.forEach((recharge) => (sumRecharges += recharge.amount));
  transactions.forEach(
    (transaction) => (sumTransactions += transaction.amount)
  );

  const balance = sumRecharges - sumTransactions;
  const res = { balance, transactions, recharges }

  return res;
}
