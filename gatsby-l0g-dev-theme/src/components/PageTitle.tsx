import React from "react";

import { ThemeValue } from "../types";
import { DEFAULT_THEME } from "../constants";

import { StyleModules } from "../style-modules";

const styles = StyleModules.pageTitle;

interface PageTitleProps {
  children: string;
  theme?: ThemeValue;
}

export const PageTitle = ({
  children,
  theme = DEFAULT_THEME,
}: PageTitleProps) => {
  return <h1 className={styles[theme]}>{children}</h1>;
};
