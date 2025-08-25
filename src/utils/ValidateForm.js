function validateEmailAndPassword(email, password) {
  let errorMessage = { emailError: "", passwordError: "" };

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    errorMessage = { ...errorMessage, emailError: "Email is not valid" };
  }

  /*A common regular expression (regex) for password validation in JavaScript to enforce 
  includes checks for minimum length, presence of uppercase letters, lowercase letters, digits, and special characters. */
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    errorMessage = { ...errorMessage, passwordError: "Password is not valid" };
  }

  return errorMessage;
}

function validateUsername(username = "Pooja@#$%") {
  /* A regular expression (regex) for name validation in JavaScript that allows 
    alphanumeric characters, spaces, and hyphens, and ensures the string is not empty */
  const nameRegex = /^[a-zA-Z0-9\s-]+$/;
  let usernameError = "";

  if (!nameRegex.test(username)) {
    usernameError =
      "Username shall only contains letters, numbers, spaces and hypen!";
  }
  return usernameError;
}

export { validateEmailAndPassword, validateUsername };
