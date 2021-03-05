const router = require("express").Router();
const Quiz = require("../model/Quiz");
const Score = require("../model/Score");
const { verify } = require("jsonwebtoken");

router.get("/allQuizzes", async (req, res) => {
  const quizzes = await Quiz.find({}).sort({ _id: -1 }).limit(30);
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

router.get("/mostPopular", async (req, res) => {
  const quizzes = await Quiz.find().sort({ counter: -1 }).limit(1);
  res.json(quizzes);
});

router.post("/addQuiz", verify, async (req, res) => {
  const quiz = new Quiz({
    title: req.body.title,
    author: req.body.author,
    amountOfQuestions: req.body.amountOfQuestions,
    colors: req.body.colors,
    iconName: req.body.iconName,
    questions: req.body.questions,
    counter: 0,
  });

  try {
    const savedQuiz = await quiz.save();
    res.send(savedQuiz);
  } catch (error) {
    res.send(error);
  }
});

router.post("/addScore", verify, async (req, res) => {
  const score = new Score({
    score: req.body.score,
    quizID: req.body.quizID,
    executor: req.body.executor,
  });

  try {
    const doesScoreExist = await Score.findOne({
      quizID: req.body.quizID,
      executor: req.body.executor,
    });

    if (!doesScoreExist) {
      await score.save();
      res.json({ message: "Successfully add score" });
    } else {
      await Score.updateOne(
        { quizID: req.body.quizID, executor: req.body.executor },
        { $set: { score: req.body.score } }
      );
      res.json({ message: "Successfully update score" });
    }
  } catch (error) {
    res.send(error);
  }
});

router.put("/updateCounter", async (req, res) => {
  const id = req.body.id;
  try {
    const quizCounter = await Quiz.findOne({ _id: id });
    await Quiz.updateOne(
      { _id: id },
      { $set: { counter: quizCounter.counter + 1 } }
    );
    res.json({ message: "Successfully update counter" });
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
