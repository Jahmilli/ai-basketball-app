// TODO: Really shouldn't be returning S3 URI from backend but we can survive with it for now...
// Example URI 's3://test-bucket/12312312-1231-1231-1231-123123123123.mp4',
export const parseS3Uri = (uri: string) => {
  return uri.replace(/s3:\/\/.*\//, "");
};

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
