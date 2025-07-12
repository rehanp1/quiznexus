import {
  getDataFromDB,
  saveDB,
  showToast,
  isAuthenticate,
  getCounter,
  fetchData,
  showDailog,
  closeDailog,
  openFullscreen,
  closeFullscreen,
  generateTestName,
} from "./utils.js";
window.showDailog = showDailog;
window.closeDailog = closeDailog;
window.openFullscreen = openFullscreen;
window.closeFullscreen = closeFullscreen;
window.generateTestName = generateTestName;

const handleRegister = (e) => {
  e.preventDefault();
  const username = e.srcElement[0].value;
  const email = e.srcElement[1].value;
  const password = e.srcElement[2].value;

  let users = getDataFromDB("Users") || [];
  const found = users.find((u) => u.email === email);

  if (found) {
    //toast message
    showToast("User with this email is already exists", "error");
    return;
  }

  users = [...users, { username, email, password, tests: [] }];

  saveDB("Users", users);
  Login();
};

const handleLogin = (e) => {
  const email = e.srcElement[0].value;
  const password = e.srcElement[1].value;

  const users = getDataFromDB("Users") || [];

  const found = users.find((u) => u.email === email && u.password === password);

  if (!found) {
    //toast message
    showToast("Invalid credentials !", "error");
    return;
  }

  saveDB("Session", found);
  // redirect to home page
  LandingPage();
};

const handleLogout = () => {
  localStorage.removeItem("Session");
  LandingPage();
};

const confirmBeforeTest = () => {
  let str = `
    <div>
      <h4>Are you sure you wanna take test ?</h4>
      <button onclick="closeDailog()" class="cancel-button">Cancel</button>
      <button onclick="QuizPanel()" class="start-button">Start</button>
    </div>
  `;
  showDailog(str);
};

window.handleRegister = handleRegister;
window.handleLogin = handleLogin;
window.handleLogout = handleLogout;
window.confirmBeforeTest = confirmBeforeTest;

//
// -----------------------------------------------------------------------------------
window.LandingPage = LandingPage;
window.Login = Login;
window.Register = Register;
window.Dashboard = Dashboard;
window.QuizPanel = QuizPanel;

function Navbar() {
  const isAuth = isAuthenticate();
  const userNameFirstLetter = getDataFromDB("Session")?.username.slice(0, 1);
  return `
      <nav>
        <div class="flex-class">
          <div class="logo" onclick="LandingPage()">
            QuizNexus.
          </div>

          <ul>
            <li><a href="https://opentdb.com/" target="_blank">Trivia </a></li>
            <li onclick="confirmBeforeTest()">Quiz</li>
            ${isAuth ? "<li onclick='Dashboard()'>Dashboard</li>" : " "}
          </ul>
        </div>

        <div class="btns">
            ${
              isAuth
                ? `
                <button class="log-in" onclick="handleLogout()">Logout</button>
                <div class="avatar">${userNameFirstLetter}</div>
                `
                : `
                <button class="log-in" onclick="Login()">Login</button>
                <button class="join-now" onclick="Register()">Registration</button>
                `
            }
        </div>
      </nav>

      <div class="mobile-nav">
          <h2 class="logo">QuizNexus.</h2>
          <img src="/images/icons/menu.svg" alt="menu" style="filter: invert(1)" />
        </div>
  
  `;
}

function LandingPage() {
  let str = `
    <main>

     ${Navbar()}

      <div class="wrapper">
        <div class="info">
          <h2>daily quiz, daily bonus- play today!</h2>
          <p>
            Dive into the ultimate quiz experience — a blend of excitement,
            learning. and triumph, quizzes it's more than a game.
          </p>
          <button onclick="confirmBeforeTest()"><i class="fa-solid fa-circle-play"></i>play today</button>
        </div>
        <img src="/images/hero.png" width="100%" alt="" />
      </div>
    </main>
  `;

  root.innerHTML = str;
}

function Login() {
  let str = `
    <div class="center">
      <div class="form-container">
        
        <div class="form-section">
          <h2>LOG IN</h2>
          <p>
            Welcome to the Quiz Master App for enhancing knowledge. Log in as a
            member to experience.
          </p>

          <form onsubmit="handleLogin(event)" id="login-form">
            
            <label>
              <span>Email</span>
              <input type="email" class="custom-input" />
            </label>

            
            <label>
              <span>Password</span>
              <input type="password" class="custom-input" />
            </label>
           
            <button type="submit" class="form-button"">Log in</button>
            
            <p class="create-account">Don't have an account? 
              <span onclick="Register()">Create Account</span>
            </p>
              
          </form>
        </div>

        
        <div class="welcome-section">
          <h2>Welcome, Back!</h2>
          <p>Register with your personal details to use all of site features</p>
          <button class="form-link" onclick="Register()">REGISTER</button>
        </div>
      </div>
    </div>
  `;
  root.innerHTML = str;
}

function Register() {
  let str = `
    <div class="center">
      <div class="form-container register-container">
        
        <div class="form-section">
          <h2>REGISTER</h2>
          <p>
            Welcome to the Quiz Master App
          </p>

          <form onsubmit="handleRegister(event)" id="register-form">

            <label>
              <span>Username</span>
              <input type="text" class="custom-input" />
            </label>
            
            <label>
              <span>Email</span>
              <input type="email" class="custom-input" />
            </label>

            
            <label>
              <span>Password</span>
              <input type="password" class="custom-input" />
            </label>
           
            <button type="submit" class="form-button"">Create Account</button>
            
            <p class="create-account">Already have an account? 
              <span onclick="Login()">Log in</span>
            </p>
              
          </form>
        </div>

        
        <div class="welcome-section">
          <h2>Get Started!</h2>
          <p>Welcome to the QuizNexus, If you already member, Login to access account</p>
          <button class="form-link" onclick="Login()">LOGIN</button>
        </div>
      </div>
    </div>
  `;

  root.innerHTML = str;
}

function Dashboard() {
  const user = getDataFromDB("Session");

  let str = `
    ${Navbar()}
    <div class="dashboard">
      <div class="sidebar">
        <div class="profile">
          <div class="avatar-sidebar">${user?.username.slice(0, 1)}</div>
          <h2>${user.username}</h2>
          <p>${user.email}</p>
          <div class="info">
           <span>🎯 Ready to challenge yourself? </span>
            <span>🏆 Consistency leads to mastery.</span>
            <span>🧠 Learning is a journey.</span>

          </div>
        </div>

        <img style="margin-top:2rem" src="/images/dashboard.png" alt="dashboard" width="230px" height="230px" >

      </div>

      <div class="main">
        <h2>Tests Taken</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Score</th>
              <th class="attempt-quiz">Attempt Questions</th>
              <th class="percentage">Percentage</th>
            </tr>
          </thead>
          <tbody>
            ${user?.tests
              .map((test) => {
                const percentage = Math.floor((test.score * 100) / 10);
                return `
                  <tr>
                  <td>${test.name}</td>
                  <td>${test.date}</td>
                  <td>${test.score}/${test.total}</td>
                  <td class="attempt-quiz">${test.attempted}</td>
                  <td class="percentage">${percentage}%</td>
                </tr>
                `;
              })
              .join("")}
           
          </tbody>
        </table>
      </div>
    </div>
  `;

  root.innerHTML = str;
}

async function QuizPanel() {
  openFullscreen();
  closeDailog();

  const quizes = await fetchData();
  window.quizes = quizes;
  window.submitAnswers = {};
  window.testName = generateTestName();

  let str = `
    <div class="container">
      <div class="card">
        <div class="left-panel">
          <div class="quiz-title">QUIZNEXUS</div>
          <div
            style="
              display: flex;
              justify-content: space-between;
              margin-bottom: 15px;
            "
          >
            <span id="left-side-questions-title">
            </span>
            <span>Need Help ?</span>
          </div>

          <div class="attempt-status">Attempt Status</div>

          <div class="status-buttons">
            <span class="attempt">Attempt</span>
            <span class="pending">Pending</span>
            <span class="skipped">Skipped</span>
          </div>

          <div class="question-grid">
          </div>

        </div>

        <div class="right-panel">
          <div class="top-bar">
            <span>Test Name :- <span>${testName}</span></span>
            <span>Time Remaining : <span class="timer">00:00</span></span>
          </div>

          <div class="question-text">
          </div>

          <div class="options">
          </div>

          <div class="footer-buttons">
            <button class="next-btn">Next</button>
            <button onclick="handleSubmitTest()" class="submit-btn">Submit</button>
          </div>
        </div>
      </div>
    </div>
  `;

  root.innerHTML = str;

  renderQuizData(0);
  getCounter(3);
}

// ----------------------------------------------------------------------------

window.renderQuizData = renderQuizData;
window.handleChooseOption = handleChooseOption;
window.handleSubmitTest = handleSubmitTest;

function renderQuizData(currentQuiz) {
  document.getElementById("left-side-questions-title").innerHTML = `
    Question ${currentQuiz + 1}/${quizes.length}
  `;

  const questionGrid = document.getElementsByClassName("question-grid")[0];
  questionGrid.innerHTML = `
        ${quizes
          ?.map(
            (_, idx) =>
              `<button class="btn-question-grid ${
                submitAnswers[idx] !== undefined ? "active" : ""
              }" 
                onclick='renderQuizData(${idx})'>${idx + 1}</button>`
          )
          .join("")}
   `;

  const questionText = document.getElementsByClassName("question-text")[0];
  questionText.innerHTML = `
    <strong>Question ${currentQuiz + 1}</strong><br />
    ${quizes[currentQuiz].question}
  `;

  const options = document.getElementsByClassName("options")[0];
  const generateRandomIdx = Math.floor(
    Math.random() * quizes[currentQuiz].incorrect_answers.length + 1
  );

  const mixedOptions = [...quizes[currentQuiz].incorrect_answers];
  mixedOptions.splice(generateRandomIdx, 0, quizes[currentQuiz].correct_answer);

  options.innerHTML = `
    ${mixedOptions
      .map(
        (opt) =>
          `<div class="option ${
            opt === submitAnswers[currentQuiz] ? "correct" : ""
          }" 
              onclick='handleChooseOption(${currentQuiz}, ${JSON.stringify(
            opt
          )})'>
              ${opt}
            </div>`
      )
      .join("")}
  `;

  const nextBtn = document.getElementsByClassName("next-btn")[0];
  nextBtn.onclick = () => {
    if (currentQuiz >= quizes.length - 1) {
      nextBtn.style.backgroundColor = "gray";
      return;
    }

    renderQuizData(currentQuiz + 1);
    nextBtn.style.backgroundColor = "#5d3fd3";
  };
}

function handleChooseOption(currentQuiz, opt) {
  submitAnswers[currentQuiz] = opt;

  Array.from(document.getElementsByClassName("option")).forEach((item) => {
    if (item.textContent.trim() === submitAnswers[currentQuiz].trim()) {
      item.classList.add("correct");
    } else {
      item.classList.remove("correct");
    }
  });
}

function handleSubmitTest() {
  console.log("Test Sumitted");

  let score = 0;
  quizes.forEach((q, idx) => {
    if (q.correct_answer === submitAnswers[idx]) score++;
  });

  const sessionUser = getDataFromDB("Session");
  const users = getDataFromDB("Users");

  sessionUser.tests.push({
    name: testName,
    score: score,
    date: new Date().toLocaleDateString("en-US", { dateStyle: "long" }),
    total: quizes.length,
    attempted: Object.keys(submitAnswers).length,
  });

  const updatedUsers = users.map((u) =>
    u.email === sessionUser.email ? sessionUser : u
  );
  saveDB("Session", sessionUser);
  saveDB("Users", updatedUsers);
  clearInterval(timeRemainIntervalID);

  closeFullscreen();
  Dashboard();
}
