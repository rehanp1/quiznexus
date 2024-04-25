const categoryData = JSON.parse(localStorage.getItem("categoryData")) || {
  category: "Animals",
  value: 18,
};
const API_URI = `https://opentdb.com/api.php?amount=25&category=${categoryData.value}&type=multiple`;

import renderQuestion from "./RenderQuestion";
import { QuestionsTracker, isSkippedQuestion } from "./QuestionsTracker";
import scoreCalculator from "./ScoreCalculate";
import RenderTimeRemaining from "./TimeRemaining";
import Loader from "./Loader";

const optionsPanel = document.querySelector("#options-panel");
const nextBtn = document.querySelector("#nextBtn");
const submitBtn = document.querySelector("#submitBtn");

let questions = null;
let counter = 0;
let isSkipped = true;
let score = 0;

const setQuestions = (data) => {
  questions = data;
  console.log(questions);
};
const setCounter = (count) => {
  if (count >= questions.length - 1) nextBtn.disabled = true;
  counter = count;
};
const setIsSkipped = (val) => {
  isSkipped = val;
};
const setScore = (val) => {
  score = val;
};

const fetchData = async () => {
  try {
    Loader(true);
    const res = await fetch(API_URI);
    const data = await res.json();
    setQuestions(data.results);
  } catch (err) {
    console.log(err.message);
  } finally {
    Loader(false);
  }

  renderQuestion(questions, counter);
  addClickEvents();
  QuestionsTracker(questions);
  RenderTimeRemaining(questions.length, 10);
};

window.addEventListener("load", fetchData());

nextBtn.addEventListener("click", () => {
  isSkippedQuestion(isSkipped, setIsSkipped, counter);
  setCounter(counter + 1);
  renderQuestion(questions, counter);
  addClickEvents();
});

submitBtn.addEventListener("click", () => {
  scoreCalculator(score, questions.length);
});

function addClickEvents() {
  let answerOption = null;
  let buttonOptions = Array.from(optionsPanel.getElementsByTagName("button"));

  buttonOptions.forEach((item) => {
    if (item.innerHTML === questions[counter].correct_answer)
      answerOption = item;

    item.addEventListener("click", () => {
      if (item.innerHTML === answerOption.innerHTML) {
        item.classList.add("bg-green-400");
        setScore(score + 1);
      } else {
        item.classList.add("bg-red-400");
        answerOption.classList.add("bg-green-400");
      }

      setIsSkipped(false);
      isSkippedQuestion(isSkipped, setIsSkipped, counter);

      buttonOptions.forEach((btn) => (btn.disabled = "true"));
    });
  });
}
