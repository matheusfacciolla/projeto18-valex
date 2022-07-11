import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import Cryptr from "cryptr";
import bcrypt from "bcrypt";

import formatName from "../utils/formatName.js";
import * as cardRepository from "../repositories/cardRepository.js";
import * as employeeRepository from "../repositories/employeeRepository.js";
import * as paymentRepository from "../repositories/paymentRepository.js";
import * as rechargeRepository from "../repositories/rechargeRepository.js";

export async function createCard(employeeId: number, cardType: cardRepository.TransactionTypes) {

  const employee = await employeeRepository.findById(employeeId);

  if (!employee) {
    throw { type: "Not_Found", message: "This employee does not exist" };
  }

  const card = await cardRepository.findByTypeAndEmployeeId(cardType, employeeId);

  if (card) {
    throw {
      type: "Conflict",
      message: "The employee already has a card of this type",
    };
  }

  const cardNumber = faker.finance.creditCardNumber();
  const cardEmployeeName = formatName(employee.fullName);
  const cardExpiration = dayjs(Date.now()).add(5, "year").format("MM/YY");
  const numberCVV = faker.finance.creditCardCVV();
  console.log("security code", numberCVV)
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
  const cardInfo = await cardRepository.findById(id);

  if (!cardInfo) {
    throw { type: "Not_Found", message: "Card does not exist!" };
  }

  if (dayjs(cardInfo.expirationDate).isBefore(dayjs(Date.now()).format("MM-YY"))) {
    throw { type: "Bad_Request", message: "Card expired!" };
  }

  if (cardInfo.password != null) {
    throw { type: "Bad_Request", message: "Password already registered!" };
  }

  const NumberCVV = cardInfo.securityCode;
  const cryptr = new Cryptr("myTotallySecretKey");
  const decryptNumberCVV = cryptr.decrypt(NumberCVV);

  if (securityCode != decryptNumberCVV) {
    throw { type: "Bad_Request", message: "Wrong security code!" };
  }

  const encryptedPassword = bcrypt.hashSync(password, 10);
  const cardData = { password: encryptedPassword }

  await cardRepository.update(id, cardData);
}

export async function getBalanceAndStats(cardId: number) {
  const transactions = await paymentRepository.findByCardId(cardId);
  const recharges = await rechargeRepository.findByCardId(cardId);

  let sumRecharges = 0;
  let sumTransactions = 0;
  recharges.forEach(
    (recharge) => (sumRecharges += recharge.amount)
  );
  transactions.forEach(
    (transaction) => (sumTransactions += transaction.amount)
  );

  const balance = sumRecharges - sumTransactions;

  const result = {
    balance: balance,
    transactions: [...transactions],
    recharges: [...recharges],
  };

  return result;
}

export async function cardBlock(cardId: number, password: string) {
  const cardInfo = await cardRepository.findById(cardId);

  if (!cardInfo) {
    throw { type: "Not_Found", message: "Card does not exist!" };
  }

  if (dayjs(cardInfo.expirationDate).isBefore(dayjs(Date.now()).format("MM-YY"))) {
    throw { type: "Bad_Request", message: "Card expired!" };
  }

  if (cardInfo.isBlocked == true) {
    throw { type: "Bad_Request", message: "The card is already blocked!" };
  }

  const isCorrectPassword = bcrypt.compareSync(password, cardInfo.password);

  if (!isCorrectPassword) {
    throw { type: "Bad_Request", message: "Wrong password!" };
  }

  await cardRepository.update(cardId, { isBlocked: true });
}

export async function cardDesblock(cardId: number, password: string) {
  const cardInfo = await cardRepository.findById(cardId);

  if (!cardInfo) {
    throw { type: "Not_Found", message: "Card does not exist!" };
  }

  if (dayjs(cardInfo.expirationDate).isBefore(dayjs(Date.now()).format("MM-YY"))) {
    throw { type: "Bad_Request", message: "Card expired!" };
  }

  if (cardInfo.isBlocked == false) {
    throw { type: "Bad_Request", message: "The card is already blocked!" };
  }

  const isCorrectPassword = bcrypt.compareSync(password, cardInfo.password);

  if (!isCorrectPassword) {
    throw { type: "Bad_Request", message: "Wrong password!" };
  }

  await cardRepository.update(cardId, { isBlocked: false });
}