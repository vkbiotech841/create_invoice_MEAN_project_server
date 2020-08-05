import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Model are creaed to show, how and which formate data need to send to the database 
// and which formate they can be retrieved from the database.
// Hence, Model is the blueprint (class) of data present in the database.
// Generally mongoDB does not have a schema. However, we can use mongoose package to create schema.

const InvoiceSchema = new Schema({
    item: {
        type: String,
        required: true,
    },
    qty: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    due: {
        type: Date,
        required: true,
    },
    rate: {
        type: Number
    },
    tax: {
        type: Number
    }
});

// Creating Model for Mongoose schema (it is like a class, hence write name as Capital letter).
// Here, Invoice is the name of Model.
export default mongoose.model('Invoice', InvoiceSchema);