const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoute = require("./src/routes/auth");
const userRoute = require("./src/routes/user");
const quizRoute = require("./src/routes/quiz");

dotenv.config();

mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to database")
);

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(express.json());

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", req.headers.origin);
//   res.header("Access-Control-Allow-Credentials", true);
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/quiz", quizRoute);

app.listen(PORT, () => console.log(`Server is running...`));
