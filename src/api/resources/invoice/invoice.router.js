import express from 'express';
import invoiceController from './invoice.controller';

export const invoiceRouter = express.Router();
// Routes.js file is a collection of routes for various http CRUD operation between server and client at specific end points. 
// In short, routes are the collection of various "End points" at the server.
// Where client sends a request to get a response.
// Further, this routes.js file will be utilized by app.js file. Hence, this file need to be exported as well.


invoiceRouter
    .route('/')
    .post(invoiceController.create)
    .get(invoiceController.findAll);

invoiceRouter
    .route('/:id')
    .put(invoiceController.update)
    .delete(invoiceController.delete)
    .get(invoiceController.findOne);