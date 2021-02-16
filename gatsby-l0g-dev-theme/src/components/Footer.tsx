import React from "react";

import { NavItem, ThemeValue } from "../types";
import { DEFAULT_THEME } from "../constants";

import { Navbar } from "./Navbar";
import { Container } from "./Container";

import { StyleModules } from "../style-modules";

const styles = StyleModules.footer;

interface FooterProps {
  theme?: ThemeValue;
  copyright: string;
  navItems: NavItem[];
  themeRepositoryUrl: string;
}

export const Footer = ({
  theme = DEFAULT_THEME,
  copyright,
  navItems,
  themeRepositoryUrl,
}: FooterProps) => {
  return (
    <footer className={styles[theme]}>
      <Container>
        <div className={styles.inner}>
          <section className="copyright">{copyright}</section>
          <Navbar items={navItems} theme={theme} />
          <section>
            <a
              className="underline theme-link"
              href={themeRepositoryUrl}
              target="_blank"
            >
              theme
            </a>{" "}
            for{" "}
            <a
              className="underline theme-link"
              href="https://www.gatsbyjs.com/"
              target="_blank"
            >
              Gatsby.js
            </a>
          </section>
        </div>
      </Container>
    </footer>
  );
};
