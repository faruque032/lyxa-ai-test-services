import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
  PORT: Joi.number().default(3002),
  MONGODB_URI: Joi.string().required(),
  RABBITMQ_URL: Joi.string().required(),
  AUTH_SERVICE_QUEUE: Joi.string().default('auth.validation'),
});
