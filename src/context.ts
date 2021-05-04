import { createContext } from "react";
import { IUser } from "./interfaces/IUserDetails";

export const UserContext = createContext<IUser>({});
