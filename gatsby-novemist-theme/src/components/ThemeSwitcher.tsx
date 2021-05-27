import React from "react";

import { Icon } from "./Icon";

import { ThemeValue } from "../types";
import { icons } from "../icons";
import { StyleModules } from "../style-modules";

const styles = StyleModules.themeSwitcher;

interface ThemeSwitcherProps {
  theme?: ThemeValue;
  onToggle?(): void;
}

export const ThemeSwitcher = ({ theme, onToggle }: ThemeSwitcherProps) => {
  return (
    <button className={styles.btn} onClick={onToggle}>
      {theme === "dark" ? (
        <Icon src={icons.emojiSun} widthSize="18px" />
      ) : (
        <Icon src={icons.emojiWaxingCrescentMoon} widthSize="18px" />
      )}
    </button>
  );
};
