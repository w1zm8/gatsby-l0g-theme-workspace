import { Link } from "gatsby";
import React from "react";

import { StyleModules } from "../style-modules";

const styles = StyleModules.postTag;

interface PostTagProps {
  to?: string;
  children: string;
}

export const PostTag = ({ children, to }: PostTagProps) => {
  return (
    <>
      {to ? (
        <Link to={to} className={styles.tag}>
          #{children}
        </Link>
      ) : (
        <span className={styles.tag}>#{children}</span>
      )}
    </>
  );
};
