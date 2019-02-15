import * as mongoose from "mongoose";
import { AccountSchema } from "../models/crmModel";
import { Request, Response } from "express";

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

  public test(req: Request, res: Response) {
    res.setHeader("Content-Type", "application/json");
    Account.find(
      {
        Billing: [
          {
            _id: req.params.ID
          }
        ]
      },
      (err, account) => {
        if (err) {
          res.status(404).json({ err });
          return;
        } else {
          res.status(200).send(account);
        }
      }
    );
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
