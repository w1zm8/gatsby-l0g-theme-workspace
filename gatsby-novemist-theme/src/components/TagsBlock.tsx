import { graphql, Link, useStaticQuery } from "gatsby";
import React from "react";
import { PostTags } from "./PostTags";
import { InfoCard } from "./InfoCard";

import { MAX_TAGS_COUNT, PAGES_ROUTES } from "../constants";
import { PostEdge, ThemeValue } from "../types";
import { getTagsFromPosts } from "../utils";
import { Icon } from "./Icon";
import { icons } from "../icons";

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
      <h3
        className="monospace"
        style={{
          fontWeight: "bold",
          height: "22px",
          lineHeight: "1",
          display: "flex",
          alignItems: "center",
          marginBottom: "25px",
        }}
      >
        <span style={{ marginRight: "15px" }}>Tags</span>{" "}
        <Icon src={icons.emojiLabel} widthSize="25px" />
      </h3>
      <PostTags
        tags={tags}
        direction="column"
        maxCount={MAX_TAGS_COUNT.block}
      />
      {tags.length > 0 && (
        <div>
          <Link className="underline theme-link" to={PAGES_ROUTES.tags.index}>
            ...more
          </Link>
        </div>
      )}
    </InfoCard>
  );
};

const query = graphql`
  query TagsBlock {
    allMdx(
      filter: {
        fileAbsolutePath: { regex: "/content/" }
        frontmatter: {
          public: { in: true }
          type: { regex: "/(blog|post|link)/" }
        }
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
