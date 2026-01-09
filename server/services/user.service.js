import { update_dao } from "../dao/user.dao.js";

export const update_service = async (name, email,primaryAddress,secondaryAddress,optionalAddress, id) => {
  const updates = {};

  // basic fields
  if (name !== undefined) {
    updates.name = name;
  }

  if (email !== undefined) {
    updates.email = email;
  }

  // address fields
  if (primaryAddress !== undefined) {
    updates.primaryAddress = primaryAddress;
  }

  if (secondaryAddress !== undefined) {
    updates.secondaryAddress = secondaryAddress;
  }

  if (optionalAddress !== undefined) {
    updates.optionalAddress = optionalAddress;
  }

  if (Object.keys(updates).length === 0) {
    return "No valid filed is send";
  }
  let result = await update_dao(updates, id);
  return result;
};
