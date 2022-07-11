import * as cardRepository from "../../repositories/cardRepository.js";

export default async function ensureCardIsBlocked(cardInfo: cardRepository.Card) {
  if (cardInfo.isBlocked == false) {
    throw { type: "Bad_Request", message: "The card is already unblocked!" };
  }

  return
}