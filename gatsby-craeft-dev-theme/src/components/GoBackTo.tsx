import { Link } from "gatsby";
import React from "react";
import { DEFAULT_THEME } from "../constants";
import { ThemeValue } from "../types";

import styles from "../../styles/go-back-to.module.css";

interface GoBackToProps {
  to: string;
  children: string;
  direction?: "left" | "right";
  theme?: ThemeValue;
}

export const GoBackTo = ({
  to,
  children,
  direction = "left",
  theme = DEFAULT_THEME,
}: GoBackToProps) => {
  return (
    <div className={styles[theme]}>
      <Link to={to} className={styles[direction]}>
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" width="16">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          ></path>
        </svg>
        <span>
          {children.length > 40 ? `${children.substr(0, 40)}...` : children}
        </span>
      </Link>
    </div>
  );
};
