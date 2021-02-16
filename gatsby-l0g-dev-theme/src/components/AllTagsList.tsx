import { Link } from "gatsby";
import React from "react";
import { ThemeValue } from "../types";
import { PAGES_ROUTES } from "../constants";

import { StyleModules } from "../style-modules";

const styles = StyleModules.allTagsList;

interface AllTagsListProps {
  tags: { [key: string]: number };
  theme: ThemeValue;
}

export const AllTagsList = ({ tags, theme }: AllTagsListProps) => {
  return (
    <nav className={styles[theme]}>
      {Object.keys(tags).map((tag) => (
        <Link to={`${PAGES_ROUTES.tags.index}/${tag}`} key={`all-tags-${tag}`}>
          {tag} ({tags[tag]}){" "}
        </Link>
      ))}
    </nav>
  );
};
