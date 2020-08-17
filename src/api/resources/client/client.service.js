import Joi from '@hapi/joi';

export default {
    validateCreateSchema(body) {
        ////// schema for custome validator Joi//////////////
        const schema = Joi.object().keys({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string().email().required(),
        });
        const { error, value } = schema.validate(body);
        if (error && error.details) {
            return { error };
        }
        return { value };
        /////////////////////////////////////////////////////////
    },

    validateUpdateSchema(body) {
        ////// schema for custome validator Joi//////////////
        const schema = Joi.object().keys({
            firstName: Joi.string().optional(),
            lastName: Joi.string().optional(),
            email: Joi.string().email().optional(),
        });
        const { error, value } = schema.validate(body);
        if (error && error.details) {
            return { error };
        }
        return { value };
        /////////////////////////////////////////////////////////
    }
}