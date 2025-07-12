export const getDataFromDB = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const saveDB = (key, val) => {
  localStorage.setItem(key, JSON.stringify(val));
};

export const showToast = (message, type = "success") => {
  const icons = {
    success: ["Success", "/images/icons/right.svg", "var(--green)"],
    error: ["Error", "/images/icons/error.svg", "red"],
  };

  const active = icons[type];

  let str = `
    <div id="toast" style="border-left: 8px solid ${active[2]};">
      <img
        src=${active[1]}
        alt="tick"
        width="20px"
        height="20px"
      />
      <section>
        <h5>${active[0]}</h5>
        <p>${message}</p>
      </section>
    </div>
  `;
  root.innerHTML += str;

  setTimeout(() => {
    root.removeChild(document.getElementById("toast"));
  }, 3000);
};

export const isAuthenticate = () => {
  return getDataFromDB("Session") !== null;
};

export const getCounter = (min = 1) => {
  let sec = 60;
  min = min - 1;
  const id = setInterval(() => {
    sec--;
    if (sec === 0 && min === 0) {
      clearInterval(id);
      handleSubmitTest();
    } else if (sec < 0 && min !== 0) {
      sec = 59;
      min = min - 1;
    }
    document.getElementsByClassName("timer")[0].innerText = `${
      min < 10 ? "0" + min : min
    } : ${sec < 10 ? "0" + sec : sec}`;
  }, 1000);
  window.timeRemainIntervalID = id;
};

export const fetchData = async () => {
  const respone = await fetch("https://opentdb.com/api.php?amount=10");
  const data = await respone.json();
  return data?.results;
};

export const showDailog = (content) => {
  let str = `
    <div class="overlay">
      <div class="dailog">${content}</div>
    </div>
  `;
  root.innerHTML += str;
  document.body.style.overflow = "hidden";
};

export const closeDailog = () => {
  root.removeChild(document.getElementsByClassName("overlay")[0]);
  document.body.style.overflow = "auto";
};

export const openFullscreen = () => {
  const box = document.getElementById("root");
  if (box.requestFullscreen) {
    box.requestFullscreen();
  } else if (box.webkitRequestFullscreen) {
    box.webkitRequestFullscreen(); // Safari
  } else if (box.msRequestFullscreen) {
    box.msRequestFullscreen(); // IE11
  }
};

export const closeFullscreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
};

export const generateTestName = () => {
  let uniqueNum = "";
  for (let i = 1; i <= 4; i++) {
    uniqueNum += Math.floor(Math.random() * 10);
  }
  return "Test-" + uniqueNum;
};
