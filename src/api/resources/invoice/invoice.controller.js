import Invoice from './invoice.model';
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
        // Adding pagination, filter and sorting
        const { page = 1, perPage = 10, filter, sortField, sortDirection } = req.query;

        const options = {
            page: parseInt(page, 10),
            limit: parseInt(perPage, 10),
            sort: {
                [sortField]: sortDirection,
            }
        };

        const query = {};
        if (filter) {
            query.item = {
                $regex: filter
            };
        };
        if (sortField && sortDirection) {
            options.sort = {
                [sortField]: sortDirection,
            };
        };

        console.log(options);

        Invoice.paginate(query, options)         // Here, we fetching data using pagination. 
            .then(invoices =>
                setTimeout(() => {
                    res.json(invoices)
                }, 500)
            )
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

    },

    shareInvoice(req, res) {
        let { id } = req.params;
        const sharableImageUrl = "https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823__340.jpg"
        // const sharableImageUrl = "https://drive.google.com/file/d/190a0S1kK_QrdrygDtg3SmST07b8IIGpf/view?usp=sharing"
        const invoiceInfo = {
            name: 'VIKRAM KUMAR',
            title: 'Monthy Invoice',
            description: 'Your fee for this month has been paid.',
            siteName: 'Flute',
            url: 'https://thepencilapp.com/',
            imgUrl: 'https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823__340.jpg'
        };
        const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta http-equiv="content-type" content="text/html; charset=utf-8">
            <meta name='viewport' content='width=device-width, initial-scale=1' />

            <title>Invoice</title>
            <meta>${invoiceInfo.name}</meta>
            <meta name="title" content="${invoiceInfo.title}">
            <meta name="description" content="${invoiceInfo.description}">

            <meta property="og:site_name" content="${invoiceInfo.siteName}" />
            <meta property="og:title" content="${invoiceInfo.title}" />
            <meta property="og:description" content="${invoiceInfo.description}" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="${invoiceInfo.url}" />
            <meta property="og:image" itemprop="image" content="${invoiceInfo.imgUrl}" />
            <meta property="og:image:secure_url"content='${invoiceInfo.imgUrl}' />
            <meta property="og:image:type" content="image/jpeg" />
            <meta property="og:image:width" content="225" />
            <meta property="og:image:height" content="225" />
            <meta property="og:updated_time" content="1440432930" />
            <meta property="og:locale" content="en_GB" />

            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content="${invoiceInfo.url}" />
            <meta property="twitter:title" content="${invoiceInfo.title}" />
            <meta property="twitter:description" content="${invoiceInfo.description}" />
            <meta property="twitter:image" content="${invoiceInfo.imgUrl}" />

           
        </head>
        <body>
        <span itemprop="image" itemscope itemtype="image/jpeg">
         <link itemprop="url" href="${invoiceInfo.imgUrl}">
        </span>
        </body>
        </html>
        `;
        return res.status(HttpStatus.NOT_FOUND).send(html);
    }
}