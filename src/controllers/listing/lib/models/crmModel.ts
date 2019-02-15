import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const AccountInfoSchema = new Schema({
    Activate: Boolean,
    Deposit: Number,
    AccountName: String
})
export const AccountSchema = new Schema({
    ID: Number,
    Account: [AccountInfoSchema]
});