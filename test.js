const express = require("express");
const cors = require("cors");
const axios = require('axios');




const cuss = axios('http://apilayer.net/api/live?access_key=1fd202f862be8b58c5493a923f1dce02&currencies=EUR,GBP,CAD,PLN&source=USD&format=1')
.then(res => res.data)
.then(data => console.log(data.quotes))

const app = express();

var corsOptions = {
    origin: "http://localhost:4533"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

//  const db = require("./app/models");

// db.sequelize.sync({ force: false }).then(() => {
//     console.log("Drop and re-sync db.");
//   });

let pingCount = 0;
app.get('/ping',(req, res) => {
  pingCount++;
  res.send(`ping world for ${pingCount} times`);
});
// app.get("/", (req, res) => {
//     res.json({ message: "Welcome to my channel" });
// });

// require("./app/routes/product.routes")(app);

const PORT = process.env.PORT || 4532;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});


