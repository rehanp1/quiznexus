const scoreCardContianer = document.querySelector("#score-card-contianer");
const scoreOutOf = document.querySelector("#score-out-of");
const progressBar = document.querySelector("#progress-loader");
const span = progressBar.firstElementChild;

const scoreCalculator = (score, total) => {
  scoreCardContianer.classList.remove("invisible");
  scoreOutOf.innerText = `Your Score ${score} out of ${total}`;
  let percentage = Math.ceil((score * 100) / total);

  let progressCounter = 0;
  const loaderID = setInterval(() => {
    if (progressCounter === percentage) clearInterval(loaderID);
    span.innerText = `${progressCounter}%`;
    progressBar.style.background = `conic-gradient(blue ${progressCounter}%, #e5e4e2 0%)`;
    progressCounter++;
  }, 40);
};

export default scoreCalculator;
