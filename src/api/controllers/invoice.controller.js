import Invoice from '../models/invoice.model';
import Joi from '@hapi/joi';
import HttpStatus from 'http-status-codes';

const invoices = [
    { _id: "1", item: "item 1", qty: 10, date: new Date },
    { _id: "2", item: "item 2", qty: 20, date: new Date },
    { _id: "3", item: "item 3", qty: 30, date: new Date }
];

// Controller: is a collection of functions for transfering data between database and node.js.
// Here, we are exporting these functions to be used in app.js to the routes.js file.
// In routes.js file, these functions will become the part of various Http methods (CRUD) as a callback function.

export default {

    findAll(req, res, next) {
        Invoice.find()
            .then(invoices => res.json(invoices))
            .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
    },

    create(req, res, next) {
        ////// schema for custome validator Joi//////////////
        const schema = Joi.object().keys({
            item: Joi.string().required(),
            date: Joi.date().required(),
            due: Joi.date().required(),
            qty: Joi.number().integer().required(),
            tax: Joi.number().optional(),
            rate: Joi.number().optional()
        });

        const { error, value } = schema.validate(req.body);
        if (error && error.details) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
        /////////////////////////////////////////////////////////

        Invoice.create(value)
            .then(invoice => res.json(invoice))
            .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
    },

    findOne(req, res) {
        let { id } = req.params;

        Invoice.findById(id)
            .then(invoice => {
                if (!invoice) {
                    return res.status(HttpStatus.NOT_FOUND).json({ err: 'Could not find any invoice.' });
                }
                return res.json(invoice);
            })
            .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));
    },

    delete(req, res) {
        let { id } = req.params;
        Invoice.findByIdAndRemove(id)
            .then(invoice => {
                if (!invoice) {
                    return res.status(HttpStatus.NOT_FOUND).json({ err: 'Invoice does not exit.' });
                }
                return res.json(invoice);
            })
            .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));

    },
    update(req, res) {
        let { id } = req.params;

        ////// schema for custome validator Joi//////////////
        //   Since, user can update anything. So everything is optional.
        const schema = Joi.object().keys({
            item: Joi.string().optional(),
            date: Joi.date().optional(),
            due: Joi.date().optional(),
            qty: Joi.number().integer().optional(),
            tax: Joi.number().optional(),
            rate: Joi.number().optional()
        });

        const { error, value } = schema.validate(req.body);
        if (error && error.details) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
        /////////////////////////////////////////////////////////

        Invoice.findOneAndUpdate({ _id: id }, value, { new: true })
            .then(invoice => res.json(invoice))
            .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err));

    }
}