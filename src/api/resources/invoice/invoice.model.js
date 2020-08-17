import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';




const Schema = mongoose.Schema;

// Model are creaed to show, how and which formate data need to send to the database 
// and which formate they can be retrieved from the database.
// Hence, Model is the blueprint (class) of data present in the database.
// Generally mongoDB does not have a schema. However, we can use mongoose package to create schema.

// Here, we also creating relationship between client and invoice. 

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
    },
    client: {
        ref: 'Client',                    // Here, ref : Client. Hence, invoice models creates relation with client Model.
        type: Schema.Types.ObjectId,
        required: true,
    }
});

// Additing Pagination:  it creates a docs array. Where no of item as present in the object form.
// Pagination also defines: total items, limit (item per page), offset, No of pages, and current page no. 
InvoiceSchema.plugin(mongoosePaginate);

// Creating Model for Mongoose schema (it is like a class, hence write name as Capital letter).
// Here, Invoice is the name of Model.
export default mongoose.model('Invoice', InvoiceSchema);
