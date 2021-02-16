import { graphql, PageProps } from "gatsby";
import React from "react";

import {
  Breadcrumbs,
  MainLayout,
  PageGrid,
  Pagination,
  PostsList,
  PostsListHeader,
  SidePanel,
} from "../components";
import { PAGES_ROUTES } from "../constants";
import { useTheme } from "../core";
import { PostEdge } from "../types";

interface DataType {
  allMdx: {
    edges: PostEdge[];
    totalCount: number;
  };
}

interface PageContextValue {
  tag: string;
  limit: number;
  skip: number;
  currentPage: number;
  pagesCount: number;
}

const TagPostsPage = ({
  data: { allMdx },
  pageContext: { tag, currentPage, pagesCount },
}: PageProps<DataType, PageContextValue>) => {
  const { theme } = useTheme();

  return (
    <MainLayout title="Tags">
      <Breadcrumbs
        items={[
          { to: "/", label: "Home" },
          { to: PAGES_ROUTES.tags.index, label: "Tags" },
          { label: tag },
        ]}
      />
      <PostsListHeader title={`#${tag}`} theme={theme} />
      <PageGrid>
        <div style={{ width: "100%" }}>
          <PostsList posts={allMdx.edges} gridView="row" />
          {pagesCount > 1 && (
            <Pagination
              routePath={`${PAGES_ROUTES.tags.index}/${tag}`}
              theme={theme}
              currentPage={currentPage}
              pagesCount={pagesCount}
            />
          )}
        </div>
        <SidePanel />
      </PageGrid>
    </MainLayout>
  );
};

export const query = graphql`
  query TagPostsPage($tag: String!, $skip: Int!, $limit: Int!) {
    allMdx(
      limit: $limit
      skip: $skip
      filter: { frontmatter: { hidden: { ne: true }, tags: { in: [$tag] } } }
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

export default TagPostsPage;
