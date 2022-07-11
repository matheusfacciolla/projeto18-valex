export default async function ensureIsCorrectCVV(securityCode: string, decryptNumberCVV: string) {
  if (securityCode != decryptNumberCVV) {
    throw { type: "Bad_Request", message: "Wrong security code!" };
  }

  return;
}
