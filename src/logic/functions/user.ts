import AppConfig from "../../../AppConfig";
import { IUserDetails } from "../../interfaces/IUserDetails";
import { get, post } from "./core/fetch";

const server = AppConfig.apiUrl;

export const createUser = async (
  // The following ommitted fields are expected to be generated from the backend
  user: Omit<IUserDetails, "createdTimestamp" | "lastUpdated">
): Promise<void> => {
  try {
    await post(`${server}/v1/user/create`, JSON.stringify(user));
  } catch (err) {
    console.warn("An error occurred when creating user", err);
    throw err;
  }
};

export const getUser = async (userId: string): Promise<IUserDetails> => {
  try {
    const user = (await get(`${server}/v1/user/${userId}`)) as IUserDetails;
    console.log("get user result is ", user);
    return user;
  } catch (err) {
    console.warn(`An error occurred when getting user for id ${userId}`, err);
    throw err;
  }
};
