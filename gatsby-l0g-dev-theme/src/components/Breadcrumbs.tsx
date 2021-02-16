import { Link } from "gatsby";
import React from "react";

import { StyleModules } from "../style-modules";

const styles = StyleModules.breadcrumbs;

interface BreadcrumbsProps {
  items: { to?: string; label: string }[];
}

export const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  return (
    <nav className={styles.breadcrumbs}>
      {items.map(({ to = "/", label }, index) => (
        <React.Fragment key={`breadcrumb-${index}`}>
          {index === items.length - 1 ? (
            <span>{label}</span>
          ) : (
            <Link to={to} className="theme-link">
              {label}
            </Link>
          )}
          {index !== items.length - 1 && (
            <span className={styles.splitter}>/</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
