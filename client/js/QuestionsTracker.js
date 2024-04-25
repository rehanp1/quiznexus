const questionNoTracker = document.querySelector("#question-no-tracker");

let spansArr = [];

export const QuestionsTracker = (questions) => {
  questionNoTracker.innerHTML = `
    ${questions.map((_, idx) => `<span>${idx + 1}</span>`).join("")}`;

  spansArr = document.querySelectorAll("span");
};

export const isSkippedQuestion = (isSkipped, setIsSkipped, counter) => {
  
  if (isSkipped) {
    spansArr[counter].classList.add("bg-blue-500", "text-white");
  } else {
    spansArr[counter].classList.add("bg-green-500", "text-white");
  }
  setIsSkipped(true)
};
