import React from "react";
import { PageProps, graphql, Link } from "gatsby";

import {
  PageGrid,
  MainLayout,
  PostsList,
  TagsBlock,
  SidePanel,
  PostsSection,
  PostsListHeader,
} from "../components";
import { PostEdge } from "../types";
import { useTheme } from "../core";
import { getTagsFromPosts } from "../utils";
import { MAX_POSTS_COUNT_HOME_PAGE, PAGES_ROUTES } from "../constants";

interface DataType {
  allMdx: {
    edges: PostEdge[];
    totalCount: number;
  };
  site: {
    siteMetadata: {
      avatarSrc: any;
    };
  };
}

const IndexPage = ({ data: { allMdx } }: PageProps<DataType>) => {
  const { theme } = useTheme();
  const tags = getTagsFromPosts(allMdx.edges);

  return (
    <MainLayout>
      <PostsListHeader title="Feed" theme={theme} />
      <PageGrid>
        <PostsSection>
          <PostsList posts={allMdx.edges} gridView="row" />
          {allMdx.totalCount > MAX_POSTS_COUNT_HOME_PAGE && (
            <h3 className="text-center monospace">
              <Link
                to={PAGES_ROUTES.blog.index}
                className="underline theme-link"
              >
                view all
              </Link>
            </h3>
          )}
        </PostsSection>
        <SidePanel>
          <TagsBlock theme={theme} />
        </SidePanel>
      </PageGrid>
    </MainLayout>
  );
};

export const query = graphql`
  query HomePage {
    allMdx(
      limit: 6
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
            title
            slug
            date
            tags
            type
            image {
              childImageSharp {
                fluid(maxWidth: 1000) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
      totalCount
    }
  }
`;

export default IndexPage;
