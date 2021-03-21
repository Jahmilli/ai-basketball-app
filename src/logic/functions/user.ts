import AppConfig from "../../../AppConfig";
import { IUser } from "../../interfaces/IUser";
import { get, post } from "./core/fetch";

const server = AppConfig.apiUrl;

export const createUser = async (
  user: Omit<IUser, "createdTimestamp" | "lastUpdated">
): Promise<void> => {
  try {
    await post(`${server}/v1/user/create`, JSON.stringify(user));
  } catch (err) {
    console.warn("An error occurred when creating user", err);
    throw err;
  }
};

export const getUser = async (userId: string): Promise<IUser> => {
  try {
    const user = (await get(`${server}/v1/user/${userId}`)) as IUser;
    console.log("get user result is ", user);
    return user;
  } catch (err) {
    console.warn(`An error occurred when getting user for id ${userId}`, err);
    throw err;
  }
};
