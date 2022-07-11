import * as cardRepository from "../../repositories/cardRepository.js";

export default async function ensureDifferentCard(employeeId: number,cardType: cardRepository.TransactionTypes) {
  const card = await cardRepository.findByTypeAndEmployeeId(cardType, employeeId);

  if (card) {
    throw {
      type: "Conflict",
      message: "The employee already has a card of this type",
    };
  }

  return card;
}
