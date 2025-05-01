import Ajv from "ajv";
const ajv = new Ajv();

const addCategorySchema = {};
const updateCategorySchema = {};

const addCategoryValidation = ajv.compile(addCategorySchema);
const updateCategoryValidation = ajv.compile(updateCategorySchema);

export default { addCategoryValidation, updateCategoryValidation };
