const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  question: String,
  correctAnswer: String,
  incorrectAnswers: [],
  category: String,
  difficulty: String,
});

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
