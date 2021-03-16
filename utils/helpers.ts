export const validateEmail = (email: string): void => {
  if (!email.includes("@")) {
    throw new Error("Invalid email");
  }
};

export const validatePassword = (password: string): void => {
  // TODO: Validation rules should be iterated over so it's extendable!
  if (password.length < 8) {
    throw new Error("Password must be more than 8 characters long");
  }
};
