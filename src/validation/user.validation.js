import Ajv from "ajv";
const ajv = new Ajv();

const addUserSchema = {};
const updateUserSchema = {};

const addUserValidation = ajv.compile(addUserSchema);
const updateUserValidation = ajv.compile(updateUserSchema);

export default { addUserValidation, updateUserValidation };
