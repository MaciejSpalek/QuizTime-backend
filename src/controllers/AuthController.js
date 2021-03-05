const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  registerValidation,
  loginValidation,
} = require("../helpers/validation");

exports.register = async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exists");

  const nameExist = await User.findOne({ name: req.body.name });
  if (nameExist) return res.status(400).send("Name already exists");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
      expiresIn: `${process.env.TOKEN_LIFE_TIME}s`,
    });
    res
      .header("auth-token", token)
      .status(200)
      .send({
        name: savedUser.name,
        token,
        tokenLifeTime: +process.env.TOKEN_LIFE_TIME,
      });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.login = async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ name: req.body.name });
  if (!user) return res.status(400).send("Name is not found");

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid password");

  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
    expiresIn: `${process.env.TOKEN_LIFE_TIME}s`,
  });

  res
    .header("auth-token", token)
    .status(200)
    .send({
      tokenLifeTime: +process.env.TOKEN_LIFE_TIME,
      name: req.body.name,
      token,
    });
};

exports.getStatus = (req, res) => {
  try {
    res.status(200).send(true);
  } catch (error) {
    res.status(400);
  }
};
