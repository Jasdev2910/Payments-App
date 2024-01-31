const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { Account } = require("../db");
const { mongo, default: mongoose } = require("mongoose");

const router = express.Router();

// An endpoint for user to get their balance.
router.get("/balance", authMiddleware, async (req, res) => {
  const account = await Account.findOne({
    userId: req.userId,
  });

  res.json({
    balance: account.balance,
  });
});

//An endpoint for user to transfer money to another account
router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession(); //This ensures that these operations either all succeed together or fail together.

  session.startTransaction(); // This ensures that the operations within the transaction are either fully completed
  //or fully rolled back, maintaining data integrity.
  const { amount, to } = req.body;

  // first we will check our acoount balance
  const fromAccount = await Account.findOne({
    userId: req.userId,
  }).session(session); // to make it the part of the session. if we dont write .session(session) it
  // will no longer the part of the session

  if (fromAccount.balance < amount) {
    await session.abortTransaction(); // all the changes made in these operations are saved
    return res.status(400).json({
      message: "Insufficient Balance",
    });
  }

  // we will check that account exist to whom we wnat to send money
  const toAccount = await Account.findOne({ userId: to });

  if (!toAccount) {
    return res.status(400).json({
      message: "Invalid Account",
    });
  }

  // if account exists we will deduct the money from the "fromAccount" and add it to the "toAccount"
  await Account.updateOne(
    { userId: req.userId },
    {
      $inc: {
        balance: -amount,
      },
    }
  ).session(session);

  await Account.updateOne(
    { userId: to },
    {
      $inc: {
        balance: amount,
      },
    }
  ).session(session);

  // Commit the transaction
  await session.commitTransaction(); //all the changes made in these operations are saved. If the transaction is
  //aborted (using session.abortTransaction()), none of the changes made in these operations are saved.

  res.json({
    message: "transfer Successful",
  });
});

module.exports = router;
