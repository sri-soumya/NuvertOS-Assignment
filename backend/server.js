const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const compoundsRouter = require("./routes/compounds");
const usersRouter = require("./routes/users");
const { Sequelize } = require("sequelize");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const sequelize = new Sequelize(
  "mysql://root:password@localhost:3306/compound_database"
);

sequelize.sync().then(console.log("Connected to SQL Database"));

app.use("/api/compounds", compoundsRouter);
app.use("/api/users", usersRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
