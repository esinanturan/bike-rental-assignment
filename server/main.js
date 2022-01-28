const express = require("express");
const cors = require("cors");
const app = express();
const auth = require("./routes/auth");
const reservation = require("./routes/reservation");
const product = require("./routes/product");
const manager = require("./routes/manager");
const rating = require("./routes/rating");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", auth);
app.use("/reservation", reservation);
app.use("/product", product);
app.use("/user", manager);
app.use("/rating", rating);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to bike rent application." });
});

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
