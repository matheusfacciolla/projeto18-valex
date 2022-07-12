import { faker } from "@faker-js/faker";

import * as cardRepository from "../repositories/cardRepository.js";

import formatName from "../utils/formatName.js";
import formatDate from "../utils/formatDate.js";
import { encryptCVV, decryptCVV, encryptedPassword } from "../utils/cryptFormat.js";
import ensureEmployeeExist from "../utils/ensureValidations/ensureEmployeeExist.js";
import ensureDifferentCard from "../utils/ensureValidations/ensureDifferentCard.js";
import ensureCardExist from "../utils/ensureValidations/ensureCardExist.js";
import ensureDateIsNotExpiration from "../utils/ensureValidations/ensureDateIsNotExpiration.js";
import { ensureCardIsNotActive } from "../utils/ensureValidations/ensureCard.js";
import ensureIsCorrectCVV from "../utils/ensureValidations/ensureIsCorrectCVV.js";
import ensureCardIsNotBlocked from "../utils/ensureValidations/ensureCardIsNotBlocked.js";
import ensureIsCorrectPassword from "../utils/ensureValidations/ensureIsCorrectPassword.js";
import ensureCardIsBlocked from "../utils/ensureValidations/ensureCardIsBlocked.js";
import calculateBalance from "../utils/calculateBalance.js";

export async function createCard(
  employeeId: number,
  cardType: cardRepository.TransactionTypes
) {
  const employee = await ensureEmployeeExist(employeeId);
  await ensureDifferentCard(employeeId, cardType);

  const cardNumber = faker.finance.creditCardNumber();
  const cardEmployeeName = formatName(employee.fullName);
  const cardExpiration = formatDate();
  const numberCVV = faker.finance.creditCardCVV();
  console.log("security code", numberCVV);
  const encryptNumberCVV = encryptCVV(numberCVV);

  const cardData = {
    employeeId: employee.id,
    number: cardNumber,
    cardholderName: cardEmployeeName,
    securityCode: encryptNumberCVV,
    expirationDate: cardExpiration,
    password: null,
    isVirtual: false,
    originalCardId: null,
    isBlocked: false,
    type: cardType,
  };

  await cardRepository.insert(cardData);
}

export async function activateCard(
  cardId: number,
  securityCode: string,
  password: string
) {
  const cardInfo = await ensureCardExist(cardId);

  const numberCVV = cardInfo.securityCode;
  const decryptNumberCVV = decryptCVV(numberCVV);

  await ensureDateIsNotExpiration(cardInfo);
  await ensureCardIsNotActive(cardInfo);
  await ensureIsCorrectCVV(securityCode, decryptNumberCVV);

  const cardData = encryptedPassword(password);

  await cardRepository.update(cardId, cardData);
}

export async function getBalanceAndStats(cardIdNumber: number) {
  await ensureCardExist(cardIdNumber);
  const res = await calculateBalance(cardIdNumber);

  const result = {
    balance: res.balance,
    transactions: [...res.transactions],
    recharges: [...res.recharges],
  };

  return result;
}

export async function cardBlock(cardId: number, password: string) {
  const cardInfo = await ensureCardExist(cardId);
  await ensureDateIsNotExpiration(cardInfo);
  await ensureCardIsNotBlocked(cardInfo);
  await ensureIsCorrectPassword(cardInfo, password);

  await cardRepository.update(cardId, { isBlocked: true });
}

export async function cardDesblock(cardId: number, password: string) {
  const cardInfo = await ensureCardExist(cardId);
  await ensureDateIsNotExpiration(cardInfo);
  await ensureCardIsBlocked(cardInfo);
  await ensureIsCorrectPassword(cardInfo, password);

  await cardRepository.update(cardId, { isBlocked: false });
}
