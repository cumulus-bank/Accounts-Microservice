import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import { AccountController } from "../listing/lib/controllers/crmController";
import "reflect-metadata";
class ListingMongoController {
  public accountController: AccountController = new AccountController();
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes() {
    this.router.get("/healthz", (_, res) => {
      res.status(200).send("ok");
    });

    this.router.get(
      "/listAccount",
      (req: Request, res: Response, next: NextFunction) => {
        next();
      },
      this.accountController.getAccount
    );

    this.router.post(
      "/listAccount",
      (req: Request, res: Response, next: NextFunction) => {
        next();
      },
      this.accountController.addNewAccount
    );


    this.router.post(
      "/activate",
      (req: Request, res: Response, next: NextFunction) => {
        next();
      },
      this.accountController.activate
    );

    this.router.post(
      "/bill",
      (req: Request, res: Response, next: NextFunction) => {
        next();
      },
      this.accountController.paybill
    );

    this.router.post(
      "/balanceUpdate",
      (req: Request, res: Response, next: NextFunction) => {
        next();
      },
      this.accountController.balanceUpdate
    );

    this.router.post(
      "/transaction",
      (req: Request, res: Response, next: NextFunction) => {
        next();
      },
      this.accountController.addTransaction
    );

    this.router.get(
      "/listAccount/:ID",
      (_, res: Response, next: NextFunction) => {
        next();
      },
      this.accountController.getAccountById
    );

    this.router.get(
      "/listAccountID/:ID",
      (_, res: Response, next: NextFunction) => {
        next();
      },
      this.accountController.getAccountByID
    );


    this.router.put(
      "/listAccount/:ID",
      (_, res: Response, next: NextFunction) => {
        next();
      },
      this.accountController.updateAccount
    );

    this.router.delete(
      "/listAccount/:ID",
      (_, res: Response, next: NextFunction) => {
        next();
      },
      this.accountController.deleteAccount
    );
  }
}

export default new ListingMongoController().router;
