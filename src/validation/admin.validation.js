import Ajv from "ajv";
const ajv = new Ajv();

const addAdminSchema = {};
const updateAdminSchema = {};

const addAdminValidation = ajv.compile(addAdminSchema);
const updateAdminValidation = ajv.compile(updateAdminSchema);

export default { addAdminValidation, updateAdminValidation };
