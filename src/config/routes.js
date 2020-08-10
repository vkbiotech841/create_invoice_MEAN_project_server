import express from 'express';
export const router = express();
import invoiceController from '../api/controllers/invoice.controller';

// Routes.js file is a collection of routes for various http CRUD operation between server and client at specific end points. 
// In short, routes are the collection of various "End points" at the server.
// Where client sends a request to get a response.
// Further, this routes.js file will be utilized by app.js file. Hence, this file need to be exported as well.

// Routes for Invoices:
router.get('/invoices', invoiceController.findAll);
router.get('/invoices/:id', invoiceController.findOne);
router.post('/invoices', invoiceController.create);
router.delete('/invoices/:id', invoiceController.delete);
router.put('/invoices/:id', invoiceController.update);

router.get('/shareInvoice/:id', invoiceController.shareInvoice);