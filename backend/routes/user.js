const { Router } = require("express");
const zod = require("zod");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");
const authMiddleware = require("../middleware/authMiddleware");
const router = Router();

const signupSchema = zod.object({
  username: zod.string().email(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
});

const signinSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
});

router.get("/me", authMiddleware, async (req, res) => {
  const userId = req.userId;

  if (!userId) {
    return res.status(403).json({
      message: "Not Logged In",
    });
  }

  const userData = await User.findById(userId);
  const accountDetails = await Account.findOne({ userId });

  res.json({
    user: {
      firstName: userData.firstName,
      lastName: userData.lastName,
      username: userData.username,
    },
    account: {
      balance: accountDetails.balance,
    },
  });
});

router.get("/", authMiddleware, async (req, res) => {
  const userId = req.userId;

  if (!userId) {
    return res.status(403).json({
      message: "Not Logged In",
    });
  }

  const userData = await User.findById(userId);

  res.json({
    user: {
      firstName: userData.firstName,
      lastName: userData.lastName,
      username: userData.username,
      password: userData.password,
    },
  });
});

router.post("/signup", async (req, res) => {
  const body = req.body;
  const { success } = signupSchema.safeParse(req.body);

  if (!success) {
    return res.status(409).json({
      message: "Email already taken / Incorrect inputs",
    });
  }

  const existingUser = await User.findOne({
    username: body.username,
  });

  if (existingUser) {
    return res.status(409).json({
      message: "Email already taken / Incorrect inputs",
    });
  }

  const user = await User.create(body);
  console.log(user);
  const userId = user._id;

  await Account.create({
    userId,
    balance: 1 + Math.random() * 10000,
  });

  const token = jwt.sign(
    {
      userId: user._id,
    },
    JWT_SECRET
  );

  res.json({
    message: "user created successfully",
    name: user.firstName,
    token: token,
  });
});

router.post("/signin", async (req, res) => {
  const body = req.body;
  const { success } = signinSchema.safeParse(req.body);

  if (!success) {
    return res.json({
      message: "Error while logging in",
    });
  }

  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  if (user) {
    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_SECRET
    );
    res.json({
      token,
      name: user.firstName,
    });
    return;
  }

  res.status(411).json({
    message: "Invalid Credentials",
  });
});

const updateBody = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
  password: zod.string().optional(),
});

router.put("/", authMiddleware, async (req, res) => {
  const { success } = updateBody.safeParse(req.body);

  if (!success) {
    res.status(411).json({
      message: "Error while updating information",
    });
  }

  try {
    await User.updateOne(
      {
        _id: req.userId,
      },
      req.body
    );
  } catch (error) {
    console.log(error);
  }

  res.json({
    message: "Updated successfully",
  });
});

router.get("/bulk", authMiddleware, async (req, res) => {
  const filter = req.query.filter || "";
  const users = await User.find({
    $or: [{ firstName: { $regex: filter } }, { lastName: { $regex: filter } }],
  });

  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

module.exports = router;
