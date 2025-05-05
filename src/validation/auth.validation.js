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
    email: {
      type: "string",
      format: "email",
      pattern: "^[\\w.-]+@([\\w-]+\\.)+[a-zA-Z]{2,}$",
    },
    password: {
      type: "string",
      pattern:
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@_$-])[A-Za-z\\d@_$-]{8,}$",
    },
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
    email: {
      type: "string",
      format: "email",
      pattern: "^[\\w.-]+@([\\w-]+\\.)+[a-zA-Z]{2,}$",
    },

    password: {
      type: "string",
      pattern:
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@_$-])[A-Za-z\\d@_$-]{8,}$",
    },
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

const addUserValidation = ajv.compile(addUserSchema);
const loginUserValidation = ajv.compile(loginUserSchema);

export default { addUserValidation, loginUserValidation };
