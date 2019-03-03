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
    AccountID: String,
    AccountName: String,
    Type: String,
    Date: String
});
const AccountInfoSchema = new Schema({
    Activate: Boolean,
    Balance: Number,
    CuurentSpending: Number,
    AccountName: String
});
const CurrentAccount = new Schema({
    Balance: Number,
    CuurentSpending: Number,
    AccountName: String
});
export const AccountSchema = new Schema({
    ID: Number,
    Account: [AccountInfoSchema],
    CurrentAccount: [CurrentAccount],
    Transaction:[Transaction],
    Billing: [Billing]
});