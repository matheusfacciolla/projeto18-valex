import dayjs from "dayjs";

import * as rechargeRepository from "../repositories/rechargeRepository.js";
import * as cardRepository from "../repositories/cardRepository.js";

export async function cardRecharge(cardId: number, amount: number) {
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

  if (dayjs(cardInfos.expirationDate).isBefore(dayjs(Date.now()).format("MM-YY"))) {
    throw { type: "Bad_Request", message: "Card expired!" };
  }

  const rechargeObject = { cardId, amount };
  await rechargeRepository.insert(rechargeObject);
}
