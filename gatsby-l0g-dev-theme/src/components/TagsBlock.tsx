import { graphql, Link, useStaticQuery } from "gatsby";
import React from "react";
import { PostTags } from "./PostTags";
import { InfoCard } from "./InfoCard";

import { MAX_TAGS_COUNT, PAGES_ROUTES } from "../constants";
import { PostEdge, ThemeValue } from "../types";
import { getTagsFromPosts } from "../utils";

interface TagsBlockProps {
  theme?: ThemeValue;
}

interface DataType {
  allMdx: {
    edges: PostEdge[];
    totalCount: number;
  };
}

export const TagsBlock = ({ theme }: TagsBlockProps) => {
  const { allMdx } = useStaticQuery<DataType>(query);
  const tags = getTagsFromPosts(allMdx.edges);

  return (
    <InfoCard theme={theme}>
      <h3 className="monospace">Tags</h3>
      <PostTags
        tags={tags}
        direction="column"
        maxCount={MAX_TAGS_COUNT.block}
      />
      {tags.length > MAX_TAGS_COUNT.block && (
        <p>
          <Link className="underline theme-link" to={PAGES_ROUTES.tags.index}>
            ...more
          </Link>
        </p>
      )}
    </InfoCard>
  );
};

export const query = graphql`
  query TagsBlock {
    allMdx(
      filter: {
        fileAbsolutePath: { regex: "/content/" }
        frontmatter: { hidden: { ne: true } }
      }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      edges {
        node {
          excerpt
          frontmatter {
            tags
          }
        }
      }
      totalCount
    }
  }
`;
