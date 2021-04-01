import { graphql, PageProps } from "gatsby";
import React from "react";

import {
  Breadcrumbs,
  Container,
  MainLayout,
  PageGrid,
  Pagination,
  PostsList,
  PostsListHeader,
  PostsSection,
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
  convertkitEndpoint: string;
}

const TagPostsPage = ({
  data: { allMdx },
  pageContext: { tag, currentPage, pagesCount, convertkitEndpoint },
}: PageProps<DataType, PageContextValue>) => {
  const { theme } = useTheme();

  return (
    <MainLayout title="Tags">
      <br />
      <Container>
        <Breadcrumbs
          items={[
            { to: "/", label: "Home" },
            { to: PAGES_ROUTES.tags.index, label: "Tags" },
            { label: tag },
          ]}
        />
        <PostsListHeader title={`#${tag}`} theme={theme} />
        <PageGrid>
          <PostsSection>
            <PostsList posts={allMdx.edges} gridView="row" />
            {pagesCount > 1 && (
              <Pagination
                routePath={`${PAGES_ROUTES.tags.index}/${tag}`}
                theme={theme}
                currentPage={currentPage}
                pagesCount={pagesCount}
              />
            )}
          </PostsSection>
          <SidePanel convertkitEndpoint={convertkitEndpoint} />
        </PageGrid>
      </Container>
    </MainLayout>
  );
};

export const query = graphql`
  query TagPostsPage($tag: String!, $skip: Int!, $limit: Int!) {
    allMdx(
      limit: $limit
      skip: $skip
      filter: {
        fileAbsolutePath: { regex: "/content/" }
        frontmatter: {
          public: { in: true }
          tags: { in: [$tag] }
          type: { regex: "/(blog|post|link)/" }
        }
      }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      edges {
        node {
          excerpt
          frontmatter {
            type
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
