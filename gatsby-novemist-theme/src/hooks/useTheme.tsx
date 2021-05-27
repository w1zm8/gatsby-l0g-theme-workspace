import React, { createContext, useContext, useState } from "react";

import { STORAGE_THEME_KEY, THEMES } from "../constants";
import { ThemeValue } from "../types";
import { getInitialThemeValue } from "../utils";

type ThemeContextValue = {
  theme: ThemeValue;
  setTheme(newTheme: ThemeValue): void;
  toggleTheme(): void;
};

const ThemeContext = createContext<ThemeContextValue>({
  theme: getInitialThemeValue(),
  setTheme: () => {},
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<ThemeValue>(getInitialThemeValue);

  const toggleTheme = () => {
    const newTheme = theme === THEMES.dark ? THEMES.light : THEMES.dark;
    setTheme(newTheme);

    try {
      localStorage.setItem(STORAGE_THEME_KEY, newTheme);
    } catch (e) {}
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
