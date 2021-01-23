import { Link } from "gatsby";
import React from "react";
import { THEMES } from "../constants";
import { ThemeValue } from "../types";

import styles from "../../styles/go-back-to.module.css";

interface GoBackToProps {
  to: string;
  children: string;
  theme?: ThemeValue;
}

export const GoBackTo = ({
  to,
  children,
  theme = THEMES.light,
}: GoBackToProps) => {
  return (
    <div className={styles.wrapper}>
      <Link to={to} className={styles[theme]}>
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" width="16">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          ></path>
        </svg>
        <span>{children}</span>
      </Link>
    </div>
  );
};
