import React from "react";
import { GatsbyLinkProps, Link } from "gatsby";

import { ThemeValue } from "../types";
import { DEFAULT_THEME } from "../constants";

import { StyleModules } from "../style-modules";

const styles = StyleModules.paginationLink;

interface PaginationLinkProps
  extends Pick<GatsbyLinkProps<{}>, "to" | "children"> {
  isActive?: boolean;
  isDisabled?: boolean;
  theme?: ThemeValue;
}

export const PaginationLink = ({
  to,
  isActive = false,
  isDisabled = false,
  children,
  theme = DEFAULT_THEME,
}: PaginationLinkProps) => {
  const type = isDisabled ? "Disabled" : isActive ? "Active" : "Link";
  const activeClassName = `${theme}${type}`;

  return (
    <Link to={to} className={styles[activeClassName]}>
      {children}
    </Link>
  );
};
