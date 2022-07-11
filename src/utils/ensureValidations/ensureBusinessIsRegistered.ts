import * as businessRepository from "../../repositories/businessRepository.js";

export default async function ensureBusinessIsRegistered(businessId: number) {
    const businessInfos = await businessRepository.findById(businessId);

    if (!businessInfos) {
      throw { type: "Bad_Request", message: "The business is not registered!" };
    }

  return businessInfos;
}