const quizForm = document.querySelector("#quiz-form");
console.log(quizForm);

const [
  question,
  correctAnswer,
  wrongAns1,
  wrongAns2,
  wrongAns3,
  difficulty,
  category,
] = quizForm;

quizForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const quizzesValue = {
    question: question.value,
    correctAnswer: correctAnswer.value,
    wrongAns1: wrongAns1.value,
    wrongAns2: wrongAns2.value,
    wrongAns3: wrongAns3.value,
    difficulty: difficulty.value,
    category: category.value,
  };
  try {
    const res = await fetch("http://127.0.0.1:3000/createquiz", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(quizzesValue),
    });
    const data = await res.json();
    alert(data.message);
    
  } catch (error) {
    console.error(error);
  }
});
