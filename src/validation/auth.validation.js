import Ajv from "ajv";
import ajvFormats from "ajv-formats";
import ajvErrors from "ajv-errors";

const ajv = new Ajv({ allErrors: true });
ajvErrors(ajv); // For custom error messages
ajvFormats(ajv); // Add support for formats like 'email', 'date', etc.

const addUserSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    email: { type: "string", format: "email" },
    password: { type: "string" },
    role: { type: "string", enum: ["user", "admin"] },
  },
  required: ["name", "email", "password"],
  additionalProperties: false,
  errorMessage: {
    required: {
      name: "name is required.",
      email: "email is required.",
      password: "password is required.",
    },
    additionalProperties: "unexpected extra property in request body.",
  },
};

const loginUserSchema = {
  type: "object",
  properties: {
    email: { type: "string", format: "email" },
    password: { type: "string" },
  },
  required: ["email", "password"],
  additionalProperties: false,
  errorMessage: {
    required: {
      email: "email is required.",
      password: "password is required.",
    },
    additionalProperties: "unexpected extra property in request body.",
  },
};

const updateUserSchema = {};

const addUserValidation = ajv.compile(addUserSchema);
const loginUserValidation = ajv.compile(loginUserSchema);
const updateUserValidation = ajv.compile(updateUserSchema);

export default { addUserValidation, updateUserValidation, loginUserValidation };
