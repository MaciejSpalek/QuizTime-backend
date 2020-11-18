const router = require("express").Router();
const User = require("../model/User");

// router.post("/name", async (req, res) => {
//   // const { name } = req.query;
//   const userExist = User.findOne({name: req.body.name});
//   res.send(userExist);
// });

router.get("/allUsers", async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

router.get("/", async (req, res) => {
  const { name } = req.query;
  const userExist = await User.findOne({name});
  res.json(userExist);
});

module.exports = router;
