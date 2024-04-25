const form = document.querySelector("#form");
const errorsPara = document.getElementsByClassName("custom-input-error");

const [username, email, password, confirmPassword, isAgree] = form;
const [usernameError, emailError, passwordError, confirmPasswordError] =
  errorsPara;

const usernamePattern = /^[a-zA-Z\s]+$/;
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
const confirmPasswordValidator = () => {
  confirmPassword.addEventListener("keyup", () => {
    if (confirmPassword.value === password.value) {
      confirmPasswordError.classList.remove("visible");
      confirmPassword.classList.remove(
        "focus:border-pink-500",
        "focus:ring-pink-500",
        "text-pink-500"
      );
    } else {
      confirmPassword.classList.add(
        "focus:border-pink-500",
        "focus:ring-pink-500",
        "text-pink-500"
      );
      confirmPasswordError.classList.add("visible");
    }
  });
};

validator(username, usernameError, usernamePattern);
validator(email, emailError, emailPattern);
validator(password, passwordError, passwordPattern);
confirmPasswordValidator();

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://127.0.0.1:3000/register", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: username.value,
        email: email.value,
        password: password.value,
        confirmPassword: confirmPassword.value,
      }),
    });
    const data = await res.json();
    alert(data.message);
    if (data.success) location.href = "./pages/login.html";
  } catch (error) {
    console.error(error);
  }
});
