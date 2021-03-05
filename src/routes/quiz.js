const router = require("express").Router();
const { verify } = require("jsonwebtoken");
const { 
  getMostPopularQuiz,
  getSingleQuizzes,
  getAllQuizzes,
  updateCounter,
  addScore,
  addQuiz
} = require("../controllers/QuizController");

router.get("/allQuizzes", getAllQuizzes);
router.get("/singleQuiz", getSingleQuizzes);
router.get("/mostPopular", getMostPopularQuiz);
router.post("/addQuiz", verify, addQuiz);
router.post("/addScore", verify, addScore);
router.put("/updateCounter", updateCounter);

module.exports = router;
