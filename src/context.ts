import { createContext } from "react";
import { IUser } from "./interfaces/IUser";
import { initialTheme } from "./styles/theme.styles";

interface IContext {
  user: IUser;
  themeKey: string | null;
  setThemeKey: React.Dispatch<React.SetStateAction<string>>;
  theme: any;
}

export const AppContext = createContext<IContext>({
  user: {},
  themeKey: null,
  setThemeKey: () => null,
  theme: initialTheme,
});
