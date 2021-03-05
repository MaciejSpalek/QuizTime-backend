const router = require("express").Router();
const { verify } = require("jsonwebtoken");
const {
  getAllQuizzesByCategory,
  getMostPopularQuiz,
  getSingleQuizzes,
  getAllQuizzes,
  updateCounter,
  addScore,
  addQuiz
} = require("../controllers/QuizController");

router.get("/allCategoryQuizzes", getAllQuizzesByCategory);
router.get("/mostPopular", getMostPopularQuiz);
router.get("/singleQuiz", getSingleQuizzes);
router.get("/allQuizzes", getAllQuizzes);
router.put("/updateCounter", updateCounter);
router.post("/addScore", verify, addScore);
router.post("/addQuiz", verify, addQuiz);

module.exports = router;
