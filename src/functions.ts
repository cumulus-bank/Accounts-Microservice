const axios = require("axios");
const newAccount = {
  ID: 1,
  CurrentAccount: [
    {
      Balance: 10000,
      CuurentSpending: 10000,
      AccountName: "Current Account"
    },
    {
      Balance: 30000,
      CuurentSpending: 30000,
      AccountName: "Saving Account"
    },
    {
      Balance: 90000,
      CuurentSpending: 90000,
      AccountName: "Loan Account"
    },
    {
      Balance: 900000,
      CuurentSpending: 900000,
      AccountName: "Mortgage Account"
    },
    {
      Balance: 3000,
      CuurentSpending: 3000,
      AccountName: "Charity Account"
    }
  ],
  Billing: [
    {
      Product: "Home Entertainment",
      Price: 500,
      type: "bill",
      Payed: false
    },
    {
      Product: "Water And Electricity",
      Price: 1000,
      type: "bill",
      Payed: false
    },
    {
      Product: "Phone",
      Price: 100,
      type: "bill",
      Payed: false
    }
  ],
  Transaction: [],
  Account: [
    {
      Activate: false,
      Balance: 0,
      CuurentSpending: 0,
      AccountName: "Visa Card"
    },
    {
      Activate: false,
      CuurentSpending: 0,
      Balance: 0,
      AccountName: "American Express"
    },
    {
      Activate: false,
      CuurentSpending: 0,
      Balance: 0,
      AccountName: "Master Card"
    }
  ]
};
const functions = {
  fetchHealthz: () =>
    axios
      .get("http://account-svc.cumulusbank:7000/healthz")
      .then(res => res.data)
      .catch(err => "error"),
  newAccount: () =>
    axios
      .post("http://account-svc.cumulusbank:7000/listAccount",newAccount)
      .then(res => res.data)
      .catch(err => "error"),
  getAccountAll: () => 
  axios
  .get("http://account-svc.cumulusbank:7000/listAccount")
  .then(res => res.data)
  .catch(err => "error"),
  getAccountByid: (id) => 
  axios
  .get("http://account-svc.cumulusbank:7000/listAccount/"+id)
  .then(res => res.data)
  .catch(err => "error"),
  getAccountByID: (id) => 
  axios
  .get("http://account-svc.cumulusbank:7000/listAccountID/"+id)
  .then(res => res.data)
  .catch(err => "error")
};
module.exports = functions;
