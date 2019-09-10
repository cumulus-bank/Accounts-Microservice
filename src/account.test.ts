import { AccountController } from "./controllers/listing/lib/controllers/crmController";
const accountController: AccountController = new AccountController();
const functions = require("./functions");
const { MongoClient } = require("mongodb");

test("Testing jest!", () => {
  expect(true).toBe(true);
});

test("checking health check api", () => {
  expect.assertions(1);
  return functions.fetchHealthz().then(data => {
    expect(data.success).toEqual("ok");
  });
});

describe("CRUD operations", () => {
  let connection;
  let db;
  let id;
  let ID;

  beforeAll(async () => {
    connection = await MongoClient.connect("mongodb://localhost:27017", {
      useNewUrlParser: true
    });
    db = await connection.db("admin");
  });

  afterAll(async () => {
    // empty the database
    db.collection("accounts", function(err, collection) {
      // handle the error if any
      if (err) throw err;
      // delete the mongodb collection
      collection.remove({}, function(err, result) {
        // handle the error if any
        if (err) throw err;
        console.log("Collection is deleted! " + result);
        // close the connection to db when you are done with it
      });
    });
    await connection.close();
    await db.close();
  });

  it("should insert a doc into collection", async () => {
    expect.assertions(3);
    return functions.newAccount().then(data => {
      id = data["_id"];
      ID = data["ID"];
      expect(Array.isArray(data)).toEqual(false);
      expect(typeof data).toEqual("object");
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

  it("check get all account is an array if insertion is only one", async () => {
    expect.assertions(1);
    return functions.getAccountAll().then(data => {
      expect(Array.isArray(data)).toEqual(true);
    });
  });

  it("get account by id should be of type dictionary ", async () => {
    expect.assertions(3);
    return functions.getAccountByid(id).then(data => {
      expect(Array.isArray(data)).toEqual(false);
      expect(typeof data).toEqual("object");
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

  it("get account by ID of user should be of type Array ", async () => {
    expect.assertions(1);
    console.log(ID);
    return functions.getAccountByID(ID).then(data => {
      expect(Array.isArray(data)).toEqual(true);
    });
  });

  it("Delete the account  ", async () => {
    expect.assertions(1);
    return functions.getAccountByID(ID).then(data => {
      expect(Array.isArray(data)).toEqual(true);
    });
  });
});
