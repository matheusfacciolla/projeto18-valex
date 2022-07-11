import * as employeeRepository from "../../repositories/employeeRepository.js";

export default async function ensureEmployeeExist(employeeId: number) {
  const employee = await employeeRepository.findById(employeeId);
  if (!employee) {
    throw { type: "Not_Found", message: "This employee does not exist" };
  }

  return employee;
}
