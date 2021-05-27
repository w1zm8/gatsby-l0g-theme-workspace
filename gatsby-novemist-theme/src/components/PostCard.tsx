import React from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";

import { GridViewValue, Post } from "../types";
import { useTheme } from "../hooks";

import { PostCardTitle } from "./PostCardTitle";
import PostCardExcerpt, { VARIANT } from "./PostCardExcerpt";
import { PostTags } from "./PostTags";
import { PostInfo } from "./PostInfo";

import { MAX_TAGS_COUNT, RESOURCES_TYPE_ROUTE } from "../constants";

import { StyleModules } from "../style-modules";
import { capitalize } from "../utils";

const styles = StyleModules.postCard;

interface PostCardProps extends Post {
  view?: GridViewValue;
}

export const PostCard = ({
  title,
  slug,
  image,
  excerpt,
  date,
  tags,
  type,
  view = "tile",
}: PostCardProps) => {
  const { theme } = useTheme();
  const styleName = `${view}${capitalize(theme)}`;
  let to = "/";

  if (type === null) {
    to = `${RESOURCES_TYPE_ROUTE.note}/${slug}`;
  } else {
    to = `${RESOURCES_TYPE_ROUTE[type]}/${slug}`;
  }

  return (
    <article className={styles[styleName]}>
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
          <PostCardExcerpt
            theme={theme}
            variant={view === "row" ? VARIANT.second : VARIANT.first}
          >
            {excerpt}
          </PostCardExcerpt>
        </section>
        <footer>
          <PostInfo date={date} />
        </footer>
      </div>
    </article>
  );
};
