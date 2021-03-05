const router = require("express").Router();
const { verify } = require("jsonwebtoken");
const { 
  getAllUserQuizzes, 
  getAllUserScores, 
  getSingleScore,
  getSingleUser, 
  getAllNames, 
  getAllUsers
} = require("../controllers/UserController");

router.get("/allUsers", getAllUsers);
router.get("/singleUser", getSingleUser);
router.get("/allNames", getAllNames);
router.get("/allScores", verify, getAllUserScores);
router.get("/allQuizzes", getAllUserQuizzes);
router.get("/singleScore", verify, getSingleScore);

module.exports = router;