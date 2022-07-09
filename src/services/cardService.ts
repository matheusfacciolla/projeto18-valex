import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import Cryptr from "cryptr";
import bcrypt from "bcrypt";

import formatName from "../utils/formatName.js";
import * as cardRepository from "../repositories/cardRepository.js";

export async function createCard(
  employee: { id: number; fullName: string },
  cardType: cardRepository.TransactionTypes
) {
  const cardNumber = faker.finance.creditCardNumber();
  const cardEmployeeName = formatName(employee.fullName);
  const cardExpiration = dayjs(Date.now()).add(5, "year").format("MM/YY");

  const numberCVV = faker.finance.creditCardCVV();
  console.log("security code -> ", numberCVV)
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

  // if (dayjs().isAfter(cardInfo.expirationDate)) {
  //   console.log("AQUIIII666666")
  //   throw { type: "Bad_Request", message: "Card expired!" };
  // }

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
  
  const cardData = {
    employeeId: cardInfo.employeeId,
    number: cardInfo.number,
    cardholderName: cardInfo.cardholderName,
    securityCode: cardInfo.securityCode,
    expirationDate: cardInfo.expirationDate,
    password: encryptedPassword,
    isVirtual: false,
    originalCardId: null,
    isBlocked: false,
    type: cardInfo.type,
  };

  await cardRepository.update(cardInfo.id, cardData)
}
