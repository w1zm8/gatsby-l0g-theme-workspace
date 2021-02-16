import React from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";

import { GridViewValue, Post } from "../types";
import { useTheme } from "../core";

import { PostCardTitle } from "./PostCardTitle";
import PostCardExcerpt from "./PostCardExcerpt";
import { PostTags } from "./PostTags";
import { PostInfo } from "./PostInfo";

import { MAX_TAGS_COUNT } from "../constants";

import { StyleModules } from "../style-modules";

const styles = StyleModules.postCard;

interface PostCardProps extends Post {
  to: string;
  view?: GridViewValue;
}

export const PostCard = ({
  title,
  slug,
  image,
  excerpt,
  date,
  tags,
  to,
  view = "tile",
}: PostCardProps) => {
  const { theme } = useTheme();

  const commentsCount = Math.floor(Math.random() * Math.floor(10));

  return (
    <article className={styles[view]}>
      {image && (
        <Link className={styles.thumbnail} to={to}>
          {<Img className={styles.thumbnailInner} fluid={image}></Img>}
        </Link>
      )}
      <div className={styles.content}>
        <header className={styles.header}>
          <PostTags tags={tags} maxCount={MAX_TAGS_COUNT.card} id={slug} />
          <PostCardTitle to={to} theme={theme}>
            {title}
          </PostCardTitle>
        </header>
        <section className={styles.excerpt}>
          <PostCardExcerpt theme={theme}>{excerpt}</PostCardExcerpt>
        </section>
        <footer>
          <PostInfo date={date} commentsCount={commentsCount} postLink={to} />
        </footer>
      </div>
    </article>
  );
};
