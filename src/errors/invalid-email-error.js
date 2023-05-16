export function invalidEmailError(email) {
  return {
    name: "InvalidEmailError",
    email: email,
    message: `"${email}" is not a valid email!`,
  };
}

export function duplicatedEmailError() {
  return {
    name: "DuplicatedEmailError",
    message: "There is already an user with given email",
  };
}
