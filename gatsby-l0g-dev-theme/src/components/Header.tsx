import React from "react";
import { useLocation } from "@reach/router";

import { Navbar } from "./Navbar";
import { Logo } from "./Logo";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { Container } from "./Container";

import { useTheme } from "../core";
import { NavItem } from "../types";

import { StyleModules } from "../style-modules";

const headerStyles = StyleModules.header;

interface HeaderProps {
  logoTitle: string;
  navItems: NavItem[];
}

export const Header = ({ logoTitle, navItems }: HeaderProps) => {
  const { theme, toggleTheme } = useTheme();
  const { pathname } = useLocation();

  return (
    <header className={headerStyles[theme]}>
      <Container>
        <div className={headerStyles.inner}>
          <Logo title={logoTitle} theme={theme} />
          <div className={headerStyles.row}>
            <Navbar
              items={navItems}
              currentPath={pathname}
              theme={theme}
              withLine
            />
            <ThemeSwitcher theme={theme} onToggle={toggleTheme} />
          </div>
        </div>
      </Container>
    </header>
  );
};
