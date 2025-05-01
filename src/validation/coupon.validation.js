import Ajv from "ajv";
const ajv = new Ajv();

const addCouponSchema = {};
const updateCouponSchema = {};

const addCouponValidation = ajv.compile(addCouponSchema);
const updateCouponValidation = ajv.compile(updateCouponSchema);

export default { addCouponValidation, updateCouponValidation };
