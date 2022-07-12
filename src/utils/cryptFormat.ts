import Cryptr from "cryptr";
import bcrypt from "bcrypt";

export function encryptCVV(numberCVV: string) {
  const cryptr = new Cryptr("myTotallySecretKey");
  const encryptNumberCVV = cryptr.encrypt(numberCVV);

  return encryptNumberCVV;
}

export function decryptCVV(numberCVV: string) {
  const cryptr = new Cryptr("myTotallySecretKey");
  const encryptNumberCVV = cryptr.decrypt(numberCVV);

  return encryptNumberCVV;
}

export function encryptedPassword(password: string) {
  const encryptedPassword = bcrypt.hashSync(password, 10);
  const cardData = { password: encryptedPassword };

  return cardData;
}
