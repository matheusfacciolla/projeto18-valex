import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import Cryptr from "cryptr";

import * as cardRepository from "../repositories/cardRepository.js";

export async function createCard(
  employee: { id: number; fullName: string },
  cardType: cardRepository.TransactionTypes
) {
  const cardNumber = faker.finance.creditCardNumber();
  //const cardEmployeeName = fullName
  //const cardExpiration = dayjs(Date.now()).format("MM/YY")
  const numberCVV = faker.finance.creditCardCVV();
  //const cryptr = new Cryptr();
  //const encryptNumberCVV = cryptr.encrypt(numberCVV);

  //   const cardData = {
  //     employeeId: employee.id,
  //     number: cardNumber,
  //     cardholderName: cardEmployeeName,
  //     securityCode: numberCVV,
  //     expirationDate: cardExpiration,
  //     password,
  //     isVirtual,
  //     originalCardId,
  //     isBlocked,
  //     type: cardType,
  //   };

  // await cardRepository.insert(cardData);
}
