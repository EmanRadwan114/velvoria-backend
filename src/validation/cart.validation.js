import Ajv from "ajv";
const ajv = new Ajv();

const addCartSchema = {};
const updateCartSchema = {};

const addCartValidation = ajv.compile(addCartSchema);
const updateCartValidation = ajv.compile(updateCartSchema);

export default { addCartValidation, updateCartValidation };
