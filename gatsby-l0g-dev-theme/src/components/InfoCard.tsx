import React from "react";

import { DEFAULT_THEME } from "../constants";
import { ThemeValue } from "../types";

import { StyleModules } from "../style-modules";

const styles = StyleModules.infoCard;

interface InfoCardProps {
  theme?: ThemeValue;
  children: React.ReactNode;
}

export const InfoCard = ({
  children,
  theme = DEFAULT_THEME,
}: InfoCardProps) => {
  return <div className={styles[theme]}>{children}</div>;
};
