const { Router } = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { History, User } = require("../db");
const router = Router();

router.get("/", authMiddleware, async (req, res) => {
  const userData = await User.findById(req.userId);

  res.json({
    userData,
  });
});

module.exports = router;
