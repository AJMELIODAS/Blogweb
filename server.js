require("dotenv").config();
const { urlencoded } = require("express");
let express = require("express");
let app = express();
let mongoose = require("mongoose");
let subscribersRouter = require("./routes/subscribers");

mongoose.connect(process.env.DATABASE_URL);
let db = mongoose.connection;
let port = 3000;

db.on("error", (err) => console.error(err));
db.once("open", () => console.log("connected to Data Base"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use("/subscribers", subscribersRouter);
app.listen(port, () => {
  console.log(`Server running at port: ${port}`);
});
