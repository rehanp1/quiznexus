const questionHead = document.querySelector("#question-head");
const questionPanel = document.querySelector("#question-panel");
const optionsPanel = document.querySelector("#options-panel");
const questionSideHead = document.querySelector("#question-side-head");
const quizCardCategory = document.querySelector("#quiz-card-category");


const renderQuestion = (questions, counter) => {
  let { incorrect_answers, correct_answer } = questions[counter];
  let randomIndex = Math.floor(Math.random() * (incorrect_answers.length + 1));
  incorrect_answers.splice(randomIndex, 0, correct_answer);

  quizCardCategory.innerHTML = `Category:- ${questions[0].category}`
  questionSideHead.innerHTML = `Question ${counter+1}/${questions.length}`
  questionHead.innerHTML = `Question ${counter + 1}`;
  questionPanel.innerHTML = `${questions[counter].question}`;
  optionsPanel.innerHTML = `
          ${incorrect_answers.map((opt) => `<button>${opt}</button>`).join("")}
          `;
};

export default renderQuestion;
