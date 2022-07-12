import * as cardRepository from "../../repositories/cardRepository.js";

export async function ensureCardIsNotActive(cardInfo: cardRepository.Card) {
  if (cardInfo.password != null) {
    throw { type: "Bad_Request", message: "Card is already active!" };
  }

  return;
}

export async function ensureCardIsActive(cardInfo: cardRepository.Card) {
  if (cardInfo.password == null) {
    throw { type: "Bad_Request", message: "Card is not active!" };
  }

  return;
}