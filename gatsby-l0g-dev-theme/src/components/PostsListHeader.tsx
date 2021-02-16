import React, { CSSProperties } from "react";
import { ThemeValue } from "../types";

import { PageTitle } from "./PageTitle";
// import { SearchField } from "./SearchField";

import { StyleModules } from "../style-modules";

const styles = StyleModules.postsListHeader;

interface PostsListHeaderProps {
  theme: ThemeValue;
  title: string;
  style?: CSSProperties;
}

export const PostsListHeader = ({
  theme,
  title,
  style,
}: PostsListHeaderProps) => {
  return (
    <header className={styles[theme]} style={style}>
      <PageTitle theme={theme}>{title}</PageTitle>
      <div
        style={{
          textAlign: "right",
        }}
      >
        {/* <Link to="/tags" className="theme-link monospace">
          All Tags
        </Link> */}
        {/* <SearchField /> */}
      </div>
    </header>
  );
};
