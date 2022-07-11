import dayjs from "dayjs";
import bcrypt from "bcrypt";

import * as paymentRepository from "../repositories/paymentRepository.js";
import * as cardRepository from "../repositories/cardRepository.js";
import * as businessRepository from "../repositories/businessRepository.js";
import * as rechargeRepository from "../repositories/rechargeRepository.js";

export async function cardPayment(
  cardId: number,
  password: string,
  businessId: number,
  amount: number
) {
  if (amount <= 0) {
    throw {
      type: "Bad_Request",
      message: "Amount should be greater than zero!",
    };
  }

  const cardInfos = await cardRepository.findById(cardId);

  if (!cardInfos) {
    throw { type: "Not_Found", message: "Card does not exist!" };
  }

  if (cardInfos.password === null) {
    throw {
      type: "Bad_Request",
      message: "The card must be active!",
    };
  }

  if (
    dayjs(cardInfos.expirationDate).isBefore(dayjs(Date.now()).format("MM-YY"))
  ) {
    throw { type: "Bad_Request", message: "Card expired!" };
  }

  if (cardInfos.isBlocked === true) {
    throw { type: "Bad_Request", message: "Card is blocked!" };
  }

  const isCorrectPassword = bcrypt.compareSync(password, cardInfos.password);

  if (!isCorrectPassword) {
    throw { type: "Bad_Request", message: "Wrong password!" };
  }

  const businessInfos = await businessRepository.findById(businessId);

  if (!businessInfos) {
    throw { type: "Bad_Request", message: "The business is not registered!" };
  }

  if (cardInfos.type != businessInfos.type) {
    throw {
      type: "Bad_Request",
      message: "The card type is not the same than business type!",
    };
  }

  const transactions = await paymentRepository.findByCardId(cardId);
  const recharges = await rechargeRepository.findByCardId(cardId);

  let sumRecharges = 0;
  let sumTransactions = 0;
  recharges.forEach(
    (recharge) => (sumRecharges += recharge.amount)
  );
  transactions.forEach(
    (transaction) => (sumTransactions += transaction.amount)
  );

  const balance = sumRecharges - sumTransactions;

  if(amount > balance){
    throw {
      type: "Bad_Request",
      message: "The card does not have enough balance!",
    };
  }

  const paymentObject = { cardId, businessId, amount };
  await paymentRepository.insert(paymentObject);
}
