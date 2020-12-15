const router = require("express").Router();
const Quiz = require("../model/Quiz");
const Score = require("../model/Score");

router.post("/addQuiz", async (req, res) => {
  const quiz = new Quiz({
    title: req.body.title,
    author: req.body.author,
    amountOfQuestions: req.body.amountOfQuestions,
    colors: req.body.colors,
    iconName: req.body.iconName,
    questions: req.body.questions,
  });

  try {
    const savedQuiz = await quiz.save();
    res.send(savedQuiz);
  } catch (error) {
    res.send(error);
  }
});

router.get("/userQuizzes", async (req, res) => {
  const { author } = req.query;
  const quiz = await Quiz.find({ author });
  res.json(quiz);
});

router.get("/allQuizzes", async (req, res) => {
  const quizzes = await Quiz.find({});
  res.json(quizzes);
});

router.get("/singleQuiz", async (req, res) => {
  const { id, author } = req.query;
  try {
    const quiz = await Quiz.findOne({ _id: id, author: author });
    quiz ? res.json(quiz) : res.json({ message: "Quiz not found" });
  } catch (error) {
    res.status(400).json({ message: "Quiz not found" });
  }
});

router.post("/addScore", async (req, res) => {
  const score = new Score({
    score: req.body.score,
    quizID: req.body.quizID,
    executor: req.body.executor,
  });

  try {
    const doesScoreExist = await Score.findOne({ quizID: req.body.quizID });
    if (!doesScoreExist) {
      await score.save();
    } else {
      await Score.updateOne({quizID: req.body.quizID}, {$set: {score: req.body.score}})
    }
  } catch (error) {
    res.send(error);
  }
});

router.get("/userScores", async (req, res) => {
  const { executor } = req.query;
  const scores = await Score.find({ executor });
  res.json(scores);
});

module.exports = router;
