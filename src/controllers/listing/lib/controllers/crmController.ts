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
  public getFlights(req: Request, res: Response) {
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
  public searchFlights(req: Request, res: Response) {
    res.setHeader("Content-Type", "application/json");
    let query = {
      $and:[{
        'Year': req.body.Year,
        'Month': req.body.Month,
        'DayofMonth': req.body.DayOfMonth,
        'Origin': req.body.origin,
        'Dest': req.body.dest
      }]
    };
    Account.find( query , (err, account) => {
      if (err) {
        res.status(404).json({ err });
        return;
      } else {
        res.status(200).send(account);
      }
    });
  }
  public getFlightById(req: Request, res: Response) {
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
  public updateFlight(req: Request, res: Response) {
    res.setHeader("Content-Type", "application/json");
    Account.findOneAndUpdate(
      { _id: req.params.ID },
      req.body,
      { new: true },
      (err, flight) => {
        if (err) {
          res.status(404).json({ err });
          return;
        }
        res.json(flight);
      }
    );
  }

  public deleteFlight(req: Request, res: Response) {
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
