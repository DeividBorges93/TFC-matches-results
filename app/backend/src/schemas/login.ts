import { ObjectSchema } from 'joi';
import * as Joi from 'joi';

const loginSchemas: ObjectSchema = Joi.object({
  email: Joi
    .string()
    .required()
    .messages({
      'any.required': '400|"email" is not allowed to be empty',
    }),
  password: Joi
    .string()
    .min(7)
    .required()
    .messages({
      'any.required': '400|"password" is not allowed to be empty',
    }),
});

export default loginSchemas;
