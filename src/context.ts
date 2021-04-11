import { createContext } from "react";
import { IUser } from "./interfaces/IUser";

export const UserContext = createContext<IUser>({});
