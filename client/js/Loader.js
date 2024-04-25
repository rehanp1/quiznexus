const startLoader = document.querySelector("#loader");
const quizCard = document.querySelector("#quiz-card");

const Loader = (status) => {
  if (status) {
    startLoader.classList.remove("invisible");
    quizCard.classList.add("invisible");
  } else {
    startLoader.classList.add("invisible");
    quizCard.classList.remove("invisible");
  }
};

export default Loader;
