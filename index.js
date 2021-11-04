const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");


const postRoute = require("./routes/postRoute");
const userRoute = require("./routes/userRoute");

dotenv.config();
const app = express();

//mongo set up
mongoose.connect( process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
       if (err) throw err;
       console.log("connected to dB!");
    });

app.use(express.urlencoded({limit: '30mb', extended: true}));
app.use(express.json({limit: '30mb', extended: true}));
app.use(cors());

//routes
 app.use("/", postRoute);
 app.use("/users", userRoute);

 app.get("/", (req, res) => {
    res.send("Welcome to picMood Api!")
 });


//listen
const PORT = process.env.PORT;
app.listen(PORT || 5000, () => console.log(`connected on port: ${PORT}`));