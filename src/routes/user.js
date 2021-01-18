const router = require("express").Router();
const Score = require("../model/Score");
const User = require("../model/User");
const Quiz = require("../model/Quiz");


router.get("/allUsers", async (req, res) => {
  const users = await User.find({});
  res.json(users);
});


router.get("/singleUser", async (req, res) => {
  const { name } = req.query;
  const userExist = await User.findOne({name});
  res.json(userExist);
});


router.get("/allNames", async (req, res) => {
  const users = await User.find({}, 'name')
  res.json(users);
});


router.get("/allScores", async (req, res) => {
  const { executor } = req.query;
  const scores = await Score.find({ executor });
  res.json(scores);
});


router.get("/allQuizzes", async (req, res) => {
  const { author } = req.query;
  const quiz = await Quiz.find({ author }).sort({_id:-1});
  res.json(quiz);
});


module.exports = router;
