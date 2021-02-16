import React from "react";

import { DEFAULT_THEME } from "../constants";
import { NavItem, ThemeValue } from "../types";
import { NavLink } from "./NavLink";

import { StyleModules } from "../style-modules";

const styles = StyleModules.navbar;

interface NavbarProps {
  theme?: ThemeValue;
  currentPath?: string;
  items: NavItem[];
  withLine?: boolean;
}

export const Navbar = ({
  items,
  theme = DEFAULT_THEME,
  currentPath = "",
  withLine = false,
}: NavbarProps) => {
  return (
    <nav className={styles[theme]}>
      {items.map(({ name, path }) => (
        <NavLink
          key={path}
          to={path}
          isActive={
            path === "/" ? currentPath === path : currentPath.includes(path)
          }
          theme={theme}
        >
          {name}
        </NavLink>
      ))}
      {withLine && <span className={styles.line}></span>}
    </nav>
  );
};
