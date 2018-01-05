import { isValidIPAddress } from "../validators/isValidIPAddress";

export = {
  type: String,
  validate: {
    message: "O endereço IP é inválido!",
    validator: isValidIPAddress,
  },
};
