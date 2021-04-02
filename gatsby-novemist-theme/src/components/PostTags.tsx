import React from "react";

import { PostTag } from "./PostTag";
import { PAGES_ROUTES } from "../constants";

import { StyleModules } from "../style-modules";

const styles = StyleModules.postTags;

interface PostTagsProps {
  tags: string[];
  direction?: "row" | "column";
  maxCount?: number;
  id?: string;
}

export const PostTags = ({
  tags,
  id = "",
  direction = "row",
  maxCount = tags.length,
}: PostTagsProps) => {
  if (!tags.length) {
    return null;
  }

  const displayedTags = tags.map((tag) => tag.toLowerCase()).slice(0, maxCount);

  return (
    <div className={styles[direction]}>
      {displayedTags.map((tag) => (
        <div className={styles.tag} key={`${id}-${tag}`}>
          <PostTag to={`${PAGES_ROUTES.tags.index}/${tag}`}>{tag}</PostTag>
        </div>
      ))}
    </div>
  );
};
