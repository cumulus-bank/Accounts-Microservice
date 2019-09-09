import { AccountController } from "./controllers/listing/lib/controllers/crmController";
const accountController: AccountController = new AccountController();
const functions = require("./functions");
const { MongoClient } = require("mongodb");

test("FizzBuzz test", () => {
  expect(true).toBe(true);
});

test("checking health check api", () => {
  expect.assertions(1);
  return functions.fetchHealthz().then(data => {
    expect(data.success).toEqual("ok");
  });
});

describe("inserting new accounts", () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect("mongodb://localhost:27017", {
      useNewUrlParser: true
    });
    db = await connection.db("admin");
  });

  afterAll(async () => {
    await connection.close();
    await db.close();
  });

  it("should insert a doc into collection", async () => {
    expect.assertions(3);
    return functions.newAccount().then(data => {
      console.log(data);
      expect(Array.isArray(data)).toEqual(false);
      expect(typeof data).toEqual("object");
      console.log(Object.keys(data).sort());
      expect(Object.keys(data).sort()).toEqual([
        "Account",
        "Billing",
        "CurrentAccount",
        "ID",
        "Transaction",
        "__v",
        "_id"
      ]);
    });
  });
});
