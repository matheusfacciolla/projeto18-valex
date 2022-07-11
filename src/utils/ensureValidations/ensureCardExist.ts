import * as cardRepository from "../../repositories/cardRepository.js";

export default async function ensureCardExist(id: number) {
  const cardInfo = await cardRepository.findById(id);

  if (!cardInfo) {
    throw { type: "Not_Found", message: "Card does not exist!" };
  }

  return cardInfo;
}
