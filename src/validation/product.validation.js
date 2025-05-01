import Ajv from "ajv";
const ajv = new Ajv();

const addProductSchema = {};
const updateProductSchema = {};

const addProductValidation = ajv.compile(addProductSchema);
const updateProductValidation = ajv.compile(updateProductSchema);

export default { addProductValidation, updateProductValidation };
