const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:5644"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

 const db = require("./app/models");

db.sequelize.sync({ force: false }).then(() => {
  });

app.get("/", (req, res) => {
    res.json({ message: "Welcome to my first task" });
});

require("./app/routes/product.routes")(app);

const PORT = process.env.PORT || 5643;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});


