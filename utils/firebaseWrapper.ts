import firebase from "firebase";

// Note, error codes can be found here: https://firebase.google.com/docs/reference/js/firebase.auth.Auth

export const login = async (email: string, password: string) => {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    console.log("Login successful");
  } catch (err) {
    switch (err.code) {
      case "auth/invalid-email":
        throw new Error("Invalid email");
      case "auth/user-disabled":
        throw new Error("User disabled");
      default:
        throw new Error("Could not login, please try again...");
    }
  }
};

export const createAccount = async (
  email: string,
  password: string
): Promise<firebase.User> => {
  try {
    const createUserResult = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    const user = createUserResult.user;
    if (!user) {
      throw new Error("Unable to create user...");
    }
    user.sendEmailVerification();

    return user;
  } catch (err) {
    switch (err.code) {
      case "auth/email-already-in-use":
        throw new Error("Account already exists");
      case "auth/invalid-email":
        throw new Error("Invalid email");
      case "auth/weak-password":
        throw new Error("Weak password");
      default:
        throw new Error(
          "An error occurred during account creation, please try again..."
        );
    }
  }
};

export const sendEmailVerification = async (user: firebase.User) => {
  try {
    await user.sendEmailVerification();
  } catch (err) {
    console.warn("Could not send email verification", err);
    throw new Error("Could not send email verification");
  }
};

export const sendPasswordResetEmail = async (email: string) => {
  try {
    await firebase.auth().sendPasswordResetEmail(email);
    console.log("Sent password reset email");
  } catch (err) {
    console.warn("An error occurred when sending password reset email", err);
    switch (err.code) {
      case "auth/user-not-found":
        throw new Error("User not found");
      case "auth/invalid-email":
        throw new Error("Invalid email");
      default:
        throw new Error(
          "An error occurred when sending password reset email, please try again..."
        );
    }
  }
};

export const signout = async () => {
  try {
    await firebase.auth().signOut();
  } catch (err) {
    console.warn("An error occurred when signing out", err);
    throw new Error("An error occurred when signing out, please try again...");
  }
};
