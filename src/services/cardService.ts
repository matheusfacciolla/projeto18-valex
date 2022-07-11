import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import Cryptr from "cryptr";
import bcrypt from "bcrypt";

import * as cardRepository from "../repositories/cardRepository.js";

import formatName from "../utils/formatName.js";
import ensureEmployeeExist from "../utils/ensureValidations/ensureEmployeeExist.js";
import ensureDifferentCard from "../utils/ensureValidations/ensureDifferentCard.js";
import ensureCardExist from "../utils/ensureValidations/ensureCardExist.js";
import ensureDateIsNotExpiration from "../utils/ensureValidations/ensureDateIsNotExpiration.js";
import ensureCardIsActive from "../utils/ensureValidations/ensureCardIsActive.js";
import ensureIsCorrectCVV from "../utils/ensureValidations/ensureIsCorrectCVV.js";
import ensureCardIsNotBlocked from "../utils/ensureValidations/ensureCardIsNotBlocked.js";
import ensureIsCorrectPassword from "../utils/ensureValidations/ensureIsCorrectPassword.js";
import ensureCardIsBlocked from "../utils/ensureValidations/ensureCardIsBlocked.js";
import calculateBalance from "../utils/calculateBalance.js";

export async function createCard(employeeId: number, cardType: cardRepository.TransactionTypes) {
  const employee = await ensureEmployeeExist(employeeId);
  await ensureDifferentCard(employeeId, cardType);

  const cardNumber = faker.finance.creditCardNumber();
  const cardEmployeeName = formatName(employee.fullName);
  const cardExpiration = dayjs(Date.now()).add(5, "year").format("MM/YY");
  const numberCVV = faker.finance.creditCardCVV();
  console.log("security code", numberCVV);
  const cryptr = new Cryptr("myTotallySecretKey");
  const encryptNumberCVV = cryptr.encrypt(numberCVV);

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
  id: number,
  securityCode: string,
  password: string
) {
  const cardInfo = await ensureCardExist(id);

  const NumberCVV = cardInfo.securityCode;
  const cryptr = new Cryptr("myTotallySecretKey");
  const decryptNumberCVV = cryptr.decrypt(NumberCVV);

  await ensureDateIsNotExpiration(cardInfo);
  await ensureCardIsActive(cardInfo);
  await ensureIsCorrectCVV(securityCode, decryptNumberCVV );

  const encryptedPassword = bcrypt.hashSync(password, 10);
  const cardData = { password: encryptedPassword };

  await cardRepository.update(id, cardData);
}

export async function getBalanceAndStats(cardId: number) {
  await ensureCardExist(cardId)
  const res = await calculateBalance(cardId);

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
  await ensureIsCorrectPassword(cardInfo, password)

  await cardRepository.update(cardId, { isBlocked: true });
}

export async function cardDesblock(cardId: number, password: string) {
  const cardInfo = await ensureCardExist(cardId);
  await ensureDateIsNotExpiration(cardInfo);
  await ensureCardIsBlocked(cardInfo);
  await ensureIsCorrectPassword(cardInfo, password);

  await cardRepository.update(cardId, { isBlocked: false });
}
