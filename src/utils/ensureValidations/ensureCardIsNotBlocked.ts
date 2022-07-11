import * as cardRepository from "../../repositories/cardRepository.js";

export default async function ensureCardIsNotBlocked(cardInfo: cardRepository.Card) {
  if (cardInfo.isBlocked == true) {
    throw { type: "Bad_Request", message: "The card is blocked!" };
  }

  return
}
