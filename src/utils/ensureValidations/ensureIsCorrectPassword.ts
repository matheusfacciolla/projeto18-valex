import bcrypt from "bcrypt";

import * as cardRepository from "../../repositories/cardRepository.js";

export default async function ensureIsCorrectPassword(cardInfo: cardRepository.Card, password: string) {
    const isCorrectPassword = bcrypt.compareSync(password, cardInfo.password);

    if (!isCorrectPassword) {
      throw { type: "Bad_Request", message: "Wrong password!" };
    }

  return
}