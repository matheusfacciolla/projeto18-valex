import * as cardRepository from "../../repositories/cardRepository.js";

export async function ensureCardIsBlocked(cardInfo: cardRepository.Card) {
  if (cardInfo.isBlocked == false) {
    throw { type: "Bad_Request", message: "The card is unblocked!" };
  }

  return;
}

export async function ensureCardIsNotBlocked(cardInfo: cardRepository.Card) {
  if (cardInfo.isBlocked == true) {
    throw { type: "Bad_Request", message: "The card is blocked!" };
  }

  return;
}