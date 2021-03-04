import { Link } from "gatsby";
import React from "react";
import { DEFAULT_THEME } from "../constants";
import { ThemeValue } from "../types";

import { StyleModules } from "../style-modules";

const styles = StyleModules.goBackTo;

interface GoBackToButtonProps {
  type: "button";
  onClick(): void;
}

interface GoBackToLinkProps {
  type: "link";
  to: string;
}

type GoBackToTypeProps = GoBackToButtonProps | GoBackToLinkProps;

interface GoBackToMainProps {
  children: string;
  direction?: "left" | "right";
  theme?: ThemeValue;
}

type GoBackToProps = GoBackToMainProps & GoBackToTypeProps;

export const GoBackTo = ({
  children,
  direction = "left",
  theme = DEFAULT_THEME,
  ...props
}: GoBackToProps) => {
  const view = (
    <>
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
    </>
  );

  return (
    <div className={styles[theme]}>
      {props.type === "link" ? (
        <Link to={props.to} className={styles[direction]}>
          {view}
        </Link>
      ) : (
        <button onClick={props.onClick} className={styles[direction]}>
          {view}
        </button>
      )}
    </div>
  );
};
