const appError = {
  userAlreadyExist: {
    name: "USER_ALREADY_EXIST",
    description: "user with provided email already exist",
  },
  userNoPassword: {
    name: "USER_NO_PASSWORD",
    description: "user need to set password first",
  },
  incorrectEmailPassword: {
    name: "INCORRECT_EMAIL_PASSWORD",
    description: "no matched user based on the provided email and password",
  },
  forbidden: {
    name: "FORBIDDEN",
    description: "you're not allowed to access these resources",
  },
};

module.exports = { appError };
