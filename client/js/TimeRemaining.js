const timeRemainingPanel = document.querySelector("#time-remaining-panel");
const RenderTimeRemaining = (NoOfQuestions, TimePerQuestion) => {
  let totalTime = NoOfQuestions * TimePerQuestion;

  let m = Math.floor((totalTime % 3600) / 60);
  let s = Math.floor((totalTime % 3600) % 60);

  const id = setInterval(() => {
    let mDisplay = m <= 9 ? "0" + m + ":" : m + ":";
    let sDisplay = s <= 9 ? "0" + s : s;
    let format = mDisplay + sDisplay;
    timeRemainingPanel.innerHTML = `Time Remaining : <span class=" rounded-md py-1 px-2 border bg-sky-200 border-sky-500">${format}</span>`;
    if (m === 0 && s === 0) clearInterval(id);
    if (s === 0 && m > 0) {
      m--;
      s = 60;
    }
    s--;
  }, 1000);
};

export default RenderTimeRemaining;
