import * as rechargeRepository from "../repositories/rechargeRepository.js";

import ensureCardExist from "../utils/ensureValidations/ensureCardExist.js";
import ensureDateIsNotExpiration from "../utils/ensureValidations/ensureDateIsNotExpiration.js";
import ensureAmountIsBiggerThanZero from "../utils/ensureValidations/ensureAmoutIsBiggerThanZero.js";
import { ensureCardIsActive } from "../utils/ensureValidations/ensureCard.js";

export async function cardRecharge(cardId: number, amount: number) {
  await ensureAmountIsBiggerThanZero(amount);
  const cardInfo = await ensureCardExist(cardId);
  await ensureCardIsActive(cardInfo);
  await ensureDateIsNotExpiration(cardInfo);

  const rechargeObject = { cardId, amount };
  await rechargeRepository.insert(rechargeObject);
}
