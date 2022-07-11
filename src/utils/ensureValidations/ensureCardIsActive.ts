import * as cardRepository from "../../repositories/cardRepository.js";

export default async function ensureCardIsActive(cardInfo: cardRepository.Card) {
  if (cardInfo.password != null) {
    throw { type: "Bad_Request", message: "Password already registered!" };
  }

  return;
}
