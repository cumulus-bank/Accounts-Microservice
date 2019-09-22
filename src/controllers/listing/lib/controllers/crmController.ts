import * as mongoose from "mongoose";
import { AccountSchema } from "../models/crmModel";
import { Request, Response } from "express";
var fs    = require("fs");
var request = require('request');

const Account = mongoose.model("Account", AccountSchema);
export class AccountController {
  public addNewAccount(req: Request, res: Response) {
    res.setHeader("Content-Type", "application/json");
    let newAccount = new Account(req.body);
    newAccount.save((err, account) => {
      if (err) {
        res.status(404).json({ err });
        return;
      }
      res.json(account);
    });
  }
  public getAccount(req: Request, res: Response) {
    res.setHeader("Content-Type", "application/json");
    Account.find({}, (err, account) => {
      if (err) {
        res.status(404).json({ err });
        return;
      } else {
        res.status(200).send(account);
      }
    });
  }
  public getAccountById(req: Request, res: Response) {
    res.setHeader("Content-Type", "application/json");
    Account.findById(req.params.ID, (err, account) => {
      if (err) {
        res.status(404).json({ err });
        return;
      } else {
        res.status(200).send(account);
      }
    });
  }

  public getAccountByID(req: Request, res: Response) {
    res.setHeader("Content-Type", "application/json");
    Account.find({ ID: req.params.ID }, (err, account) => {
      if (err) {
        res.status(404).json({ err });
        return;
      } else {
        res.status(200).send(account);
      }
    });
  }

  public updateAccount(req: Request, res: Response) {
    res.setHeader("Content-Type", "application/json");
    Account.findOneAndUpdate(
      { _id: req.params.ID },
      req.body,
      { new: true },
      (err, account) => {
        if (err) {
          res.status(404).json({ err });
          return;
        }
        res.json(account);
      }
    );
  }

  public activate(req: Request, res: Response) {
    res.setHeader("Content-Type", "application/json");
    Account.update(
      { "Account._id": req.body.ID },
      { $set: { "Account.$.Activate": true, "Account.$.Balance": 10000 } },
      (err, account) => {
        if (err) {
          res.status(404).json({ err });
          return;
        }
        res.json(account);
      }
    );
  }

  public paybill(req: Request, res: Response) {
    res.setHeader("Content-Type", "application/json");
    Account.update(
      { "Billing._id": req.body.ID },
      { $set: { "Billing.$.Payed": true, "Billing.$.Price": 0 } },
      (err, account) => {
        if (err) {
          res.status(404).json({ err });
          return;
        }
        res.json(account);
      }
    );
  }

  public balanceUpdate(req: Request, res: Response) {
    res.setHeader("Content-Type", "application/json");
    Account.update(
      { "Account._id": req.body.ID },
      { $set: { "Account.$.Balance": req.body.balance } },
      (err, account) => {
        if (err) {
          res.status(404).json({ err });
          return;
        }
        res.json(account);
      }
    );
  }

  public addTransaction(req: Request, res: Response) {
    res.setHeader("Content-Type", "application/json");
    Account.update(
      { _id: req.body.ID },
      {
        $push: {
          Transaction: {
            "Product":req.body.Product,
            "Price":req.body.Price,
            "AccountID":req.body.AccountID,
            "AccountName": req.body.AccountName,
            "Type":req.body.Type,
            "Date":req.body.Date
          }
        }
      },
      (err, account) => {
        if (err) {
          res.status(404).json({ err });
          return;
        }
        res.json(account);
        // else{
        //   request({
        //     method: "POST",
        //     uri: "https://9.30.160.236:31046/topics/LedgerFeed/records",
        //     headers: {
        //       "Content-Type": "application/json",
        //       "Authorization": "Bearer hedS4cZlehLctvfnJAdvmSzonSbsCFDUGHwhNnyakDOR"
        //     },
        //     body: JSON.stringify({
        //       Transaction: {
        //         "Product":req.body.Product,
        //         "Price":req.body.Price,
        //         "AccountID":req.body.AccountID,
        //         "AccountName": req.body.AccountName,
        //         "Type":req.body.Type,
        //         "Date":req.body.Date
        //       }
        //     }),
        //     agentOptions: {
        //       ca: fs.readFileSync("./es-cert.pem")
        //     }
        //   }, function(error, httpResponse, body) {
        //    console.log(body);
        //    res.json(account);
        //   });
        // }
        
      }
    );
  }

  public deleteAccount(req: Request, res: Response) {
    res.setHeader("Content-Type", "application/json");
    Account.deleteOne({ _id: req.params.ID }, err => {
      if (err) {
        res.status(404).json({ err });
        return;
      }
      res.json({ message: "success" });
    });
  }
}
