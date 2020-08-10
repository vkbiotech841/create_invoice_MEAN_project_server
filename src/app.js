// const express = require('express');
import express from 'express';
import mongoose from 'mongoose';
import logger from 'morgan';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';


import swaggerDocument from './config/swagger.json';
import { restRouter } from './api';

///////////// Connecting to Mongoose /////////////////////////
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/invoice-builder', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(error => console.error('Could not connect to MongoDB...', error));
//////////////////////////////////////////////////////////////

const app = express();
const PORT = 3000;

////////////// Middlewares  /////////////////////////////

// Request body parser
app.use(express.json());

// Parser for url params
app.use(express.urlencoded({ extended: true }));

// CORS:Cross origin resource sharing
app.use(cors());

// List of Routes:
app.use('/api', restRouter);

// Swagger for making API documentation:
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { explorer: true }));

// Global error handling: Handling invalid routes
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.message = 'Invalid route';
    error.status = 404;
    next(error);
})

// Global error handling: Handling error messages
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.json({
        error: { message: error.message }
    });
});

//For logging errors
app.use(logger('dev'));


///////////////////////////////////////////////////////////////




/////////////// Setting enviroment PORT variable /////////////////////////////
app.listen(PORT, () => { console.log(`Server is running at PORT ${PORT}`) });
//////////////////////////////////////////////////////////////////////////////