export interface IUserDetails {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: number;
  lastUpdated: number;
  createdTimestamp: number;
}

export interface IUser {
  firebaseUserInfo?: firebase.User; // TBH probably extremely unnecessary to save this entire object, but we'll use it for now...
  userDetails?: IUserDetails;
}
