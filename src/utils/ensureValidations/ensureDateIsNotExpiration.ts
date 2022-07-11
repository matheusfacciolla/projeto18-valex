import dayjs from "dayjs";
import * as cardRepository from "../../repositories/cardRepository.js";

export default async function ensureDateIsNotExpiration(cardInfo: cardRepository.Card) {
  const isDateExpirate = dayjs(cardInfo.expirationDate).isBefore(dayjs(Date.now()).format("MM-YY"));

  if (isDateExpirate) {
    throw { type: "Bad_Request", message: "Card expired!" };
  }

  return isDateExpirate;
}
