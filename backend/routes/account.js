const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { User, Account, History } = require("../db");
const mongoose = require("mongoose");

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

  if (amount === null || amount < 1) {
    return res.status(400).json({
      message: "Enter Amount",
    });
  }

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

  console.log(toAccount);
  // console.log(typeof userData.firstName);
  // console.log(userData2.firstName);

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

  //senders history
  const receiver = await User.findById(to);
  const sender = await User.findById(req.userId);

  await User.findByIdAndUpdate(req.userId, {
    $push: {
      history: {
        $each: [{ name: receiver.firstName, amount: amount, sent: true }],
        $position: 0,
      },
    },
  });

  //receivers history

  await User.findByIdAndUpdate(to, {
    $push: {
      history: {
        $each: [{ name: sender.firstName, amount: amount, sent: false }],
        $position: 0,
      },
    },
  });

  //
  // Commit the transaction
  await session.commitTransaction(); //all the changes made in these operations are saved. If the transaction is
  //aborted (using session.abortTransaction()), none of the changes made in these operations are saved.

  res.json({
    message: "transfer Successful",
  });
});

module.exports = router;

// const receiverHistory = await History.create({
//   userId: to,
//   to: userData2.firstName, // Assuming 'to' is intended to store the sender's name
//   amount: amount,
//   from: userData.firstName, // Assuming 'from' is intended to store the recipient's name
// });
// console.log(receiverHistory);
// const ans2 = await History.create(
//   {
//     userId: to,
//   }
//   {
//     $set: {
//       to: userData2.firstName,
//       amount: amount,
//       from: userData.firstName,
//     },
//   }
// );
// console.log(ans2);

// const senderHistory = await History.create({
//   userId: req.userId,
//   to: userData.firstName, // Assuming 'to' is intended to store the recipient's name
//   amount: amount,
//   from: userData2.firstName, // Assuming 'from' is intended to store the sender's name
// });

// console.log(senderHistory);

// const ans = await History.create(
//   {
//     userId: req.userId,
//   }
//   {
//     $set: {
//       to: userData.firstName,
//       amount: amount,
//       from: userData2.firstName,
//     },
//   }
// );

// console.log(ans);
