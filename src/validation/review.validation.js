import Ajv from "ajv";
const ajv = new Ajv();

const addReviewSchema = {};
const updateReviewSchema = {};

const addReviewValidation = ajv.compile(addReviewSchema);
const updateReviewValidation = ajv.compile(updateReviewSchema);

export default { addReviewValidation, updateReviewValidation };
