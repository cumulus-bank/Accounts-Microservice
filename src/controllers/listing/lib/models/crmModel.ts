import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;
const Billing = new Schema({
    Product: String,
    Price: Number,
    Type: String,
    Payed: Boolean
});
const Transaction = new Schema({
    Product: String,
    Price: Number,
    AccountName: String,
    Type: String,
    Date: String
});
const AccountInfoSchema = new Schema({
    Activate: Boolean,
    Balance: Number,
    AccountName: String
});
export const AccountSchema = new Schema({
    ID: Number,
    Account: [AccountInfoSchema],
    Transaction:[Transaction],
    Billing: [Billing]
});