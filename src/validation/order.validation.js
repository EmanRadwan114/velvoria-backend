import Ajv from "ajv";
import ajvErrors from "ajv-errors";

const ajv = new Ajv({ allErrors: true });
ajvErrors(ajv); // For custom error messages

const addOrderSchema = {};

const updateOrderSchema = {
  type: "object",
  properties: {
    shippingStatus: {
      type: "string",
      enum: ["pending", "prepared", "shipped"],
    },
  },
  additionalProperties: false,
  errorMessage: {
    properties: {
      shippingStatus:
        "shipping status must be one of the following: pending, prepared or shipped",
    },
    additionalProperties: "unexpected extra property in request body",
  },
};

const addOrderValidation = ajv.compile(addOrderSchema);
const updateOrderValidation = ajv.compile(updateOrderSchema);

export default { addOrderValidation, updateOrderValidation };
