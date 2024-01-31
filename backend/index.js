const express = require("express");
const mainRouter = require("./routes/index");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use("/api/v1", mainRouter);

app.listen(PORT, () => {
  console.log("App is running in PORT " + PORT);
});
