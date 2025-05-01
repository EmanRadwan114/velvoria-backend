import Ajv from "ajv";
const ajv = new Ajv();

const addOrderSchema = {};
const updateOrderSchema = {};

const addOrderValidation = ajv.compile(addOrderSchema);
const updateOrderValidation = ajv.compile(updateOrderSchema);

export default { addOrderValidation, updateOrderValidation };
