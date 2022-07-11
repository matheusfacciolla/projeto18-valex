import * as businessRepository from "../../repositories/businessRepository.js";
import * as cardRepository from "../../repositories/cardRepository.js";

export default async function ensureCardAndBusinessType(cardInfo: cardRepository.Card, businessInfos: businessRepository.Business) {
  if (cardInfo.type != businessInfos.type) {
    throw {
      type: "Bad_Request",
      message: "The card type is not the same than business type!",
    };
  }

  return;
}
