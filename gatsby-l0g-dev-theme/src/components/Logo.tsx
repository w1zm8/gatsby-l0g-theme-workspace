import { Link } from "gatsby";
import React from "react";

import { ThemeValue } from "../types";
import { DEFAULT_THEME } from "../constants";

import { StyleModules } from "../style-modules";

const styles = StyleModules.logo;

interface LogoProps {
  title: string;
  theme?: ThemeValue;
}

export const Logo = ({ title, theme = DEFAULT_THEME }: LogoProps) => {
  return (
    <Link to="/" className={styles[theme]}>
      {title}
    </Link>
  );
};
