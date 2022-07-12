import * as paymentRepository from "../repositories/paymentRepository.js";

import ensureCardExist from "../utils/ensureValidations/ensureCardExist.js";
import { ensureCardIsActive } from "../utils/ensureValidations/ensureCardActive.js";
import ensureDateIsNotExpiration from "../utils/ensureValidations/ensureDateIsNotExpiration.js";
import { ensureCardIsNotBlocked } from "../utils/ensureValidations/ensureCardBlock.js";
import ensureIsCorrectPassword from "../utils/ensureValidations/ensureIsCorrectPassword.js";
import ensureBusinessIsRegistered from "../utils/ensureValidations/ensureBusinessIsRegistered.js";
import ensureCardAndBusinessType from "../utils/ensureValidations/ensureCardAndBusinessType.js";
import ensureAmountIsBiggerThanZero from "../utils/ensureValidations/ensureAmoutIsBiggerThanZero.js";
import calculateBalance from "../utils/calculateBalance.js";
import ensureBalanceBiggerThanAmount from "../utils/ensureValidations/ensureBalanceBiggerThanAmount.js";

export async function cardPayment(
  cardId: number,
  password: string,
  businessId: number,
  amount: number
) {
  await ensureAmountIsBiggerThanZero(amount);
  const cardInfo = await ensureCardExist(cardId);
  await ensureCardIsActive(cardInfo);
  await ensureDateIsNotExpiration(cardInfo);
  await ensureCardIsNotBlocked(cardInfo);
  await ensureIsCorrectPassword(cardInfo, password);
  const businessInfos = await ensureBusinessIsRegistered(businessId);
  await ensureCardAndBusinessType(cardInfo, businessInfos);

  const res = await calculateBalance(cardId);
  await ensureBalanceBiggerThanAmount(res.balance, amount);

  const paymentObject = { cardId, businessId, amount };
  await paymentRepository.insert(paymentObject);
}
