type FormInputType = {
  email: string;
  password: string;
  rePassword: string;
  firstName: string;
  lastName: string;
};

type ValidatedReturnType = {
  emailValidityError: string;
  passwordValidityError: string;
  rePasswordValidityError: string;
  firstNameValidityError: string;
  lastNameValidityError: string;
};

export default function validateUserFormInputs(
  formInputs: FormInputType
): ValidatedReturnType {
  const errorMessages: ValidatedReturnType = {
    emailValidityError: "",
    firstNameValidityError: "",
    lastNameValidityError: "",
    passwordValidityError: "",
    rePasswordValidityError: "",
  };

  const {email, password, rePassword, firstName, lastName} = formInputs

  if (email === "") {
    errorMessages.emailValidityError = "Please enter your Email"
  } else {
    // eslint-disable-next-line no-useless-escape
    const emailRegex: RegExp = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm;
    if (!emailRegex.test(email)) {
      errorMessages.emailValidityError = "Please enter a valid Email"
    }
  }

  if (password === "") {
    errorMessages.passwordValidityError = "Please enter a password"
  }

  if (rePassword === "") {
    errorMessages.rePasswordValidityError = "Please re-enter your password"
  } else if (password !== "") {
    if (password !== rePassword) {
      errorMessages.rePasswordValidityError = "Re-entered password does not match"
    }
  }

  if (firstName === "") {
    errorMessages.firstNameValidityError = "Please enter your first name"
  } else {
    const nameRegex: RegExp = /^([A-Za-z][A-Za-z,.'`-]{1,})$/gm;
    if (!nameRegex.test(firstName)) {
      errorMessages.firstNameValidityError = "Please enter a valid name"
    }
  }

  if (lastName === "") {
    errorMessages.lastNameValidityError = "Please enter your last name";
  } else {
    const nameRegex: RegExp = /^([A-Za-z][A-Za-z,.'`-]{1,})$/gm;
    if (!nameRegex.test(lastName)) {
      errorMessages.firstNameValidityError = "Please enter a valid name";
    }
  }

  return errorMessages;
}
