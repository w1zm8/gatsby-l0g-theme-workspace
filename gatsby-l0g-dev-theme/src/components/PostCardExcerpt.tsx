import React from "react";
import { DEFAULT_THEME } from "../constants";
import { ThemeValue } from "../types";

import { StyleModules } from "../style-modules";

const styles = StyleModules.postCardExcerpt;

interface PostCardExcerptProps {
  children: string;
  theme?: ThemeValue;
}

export const PostCardExcerpt = ({
  children,
  theme = DEFAULT_THEME,
}: PostCardExcerptProps) => {
  return (
    <div className={styles[theme]}>
      <p>{children}</p>
    </div>
  );
};

export default PostCardExcerpt;
