const express = require("express");
const connectDB = require("./db/connectDB.js");
const User = require("./models/userSchema.js");
const Quiz = require("./models/quizSchema.js");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
const PORT = 3000;

app.post("/register", async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    const userExist = await User.findOne({ email: email });
    if (!userExist) {
      await User.create({ name, email, password, confirmPassword });
      res
        .status(201)
        .json({ message: "User Created Successfully", success: true });
    } else {
      res.status(404).json({
        message: "User already exists with this email",
        success: false,
      });
    }
  } catch (error) {
    console.error(error);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email, password });
    if (!userExist) {
      res
        .status(404)
        .json({ message: "Invalid Username or Password", success: false });
    } else {
      res.status(200).json({
        message: "User Login successfully",
        success: true,
      });
    }
  } catch (error) {
    console.error(error);
  }
});

app.post("/createquiz", async (req, res) => {
  try {
    const {
      question,
      correctAnswer,
      wrongAns1,
      wrongAns2,
      wrongAns3,
      difficulty,
      category,
    } = req.body;
    await Quiz.create({
      question: question,
      correctAnswer: correctAnswer,
      incorrectAnswers: [wrongAns1, wrongAns2, wrongAns3],
      category: category,
      difficulty: difficulty,
    });
    res.status(201).json({ message: "Quiz added successfully", success: true });
  } catch (error) {
    console.log("Create Quiz Error:", error);
  }
});

app.get("/getquiz", async (req, res) => {
  try {
    const data = await Quiz.find({});
    res.status(200).json(data);
  } catch (error) {
    console.log("Quiz Get Error:", error);
  }
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});
