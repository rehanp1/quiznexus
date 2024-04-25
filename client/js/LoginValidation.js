const loginForm = document.querySelector("#login-form");
const errorsPara = document.getElementsByClassName("custom-input-error");

const [email, password, isAgree] = loginForm;
const [emailError, passwordError] = errorsPara;

const emailPattern = /^[a-zA-Z\.]+[0-9]*@+[a-z0-9]+\.+[a-z]{2,4}$/;
const passwordPattern = /^[A-Za-z\d#@$!%*?&]{8,20}$/;

const validator = (element, elementError, pattern) => {
  element.addEventListener("keyup", () => {
    const isValidate = pattern.test(element.value);
    if (!isValidate) {
      element.classList.add(
        "focus:border-pink-500",
        "focus:ring-pink-500",
        "text-pink-500"
      );
      elementError.classList.add("visible");
    } else {
      elementError.classList.remove("visible");
      element.classList.remove(
        "focus:border-pink-500",
        "focus:ring-pink-500",
        "text-pink-500"
      );
    }
  });
};

validator(email, emailError, emailPattern);
validator(password, passwordError, passwordPattern);

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://127.0.0.1:3000/login", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });
    const data = await res.json();
    alert(data.message);
    if (data.success) location.href = "./index.html";
  } catch (error) {
    console.error(error);
  }
});
