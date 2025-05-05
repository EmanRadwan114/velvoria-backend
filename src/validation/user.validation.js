import Ajv from "ajv";
import ajvFormats from "ajv-formats";
import ajvErrors from "ajv-errors";

const ajv = new Ajv({ allErrors: true });
ajvErrors(ajv); // For custom error messages
ajvFormats(ajv); // Add support for formats like 'email', 'date', etc.

const updateUserSchema = {
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

const updateUserValidation = ajv.compile(updateUserSchema);

export default { updateUserValidation };
