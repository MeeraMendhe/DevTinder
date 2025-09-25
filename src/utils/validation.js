const validator = require("validator");
const { default: isEmail } = require("validator/lib/isEmail");

const signInValidation = (req) => {
  const { firstName, lastName, email } = req;

  if (!validator.isEmail(email)) {
    throw new Error("Please enter the valid Email");
  }
  if (firstName?.length < 4) {
    throw new Error("Firstname minimum length should be more than 4 char");
  }
};

module.exports = { signInValidation };
