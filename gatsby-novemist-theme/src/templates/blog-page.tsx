import React from "react";
import { PageProps, graphql } from "gatsby";

import {
  PageGrid,
  MainLayout,
  PostsList,
  PostsSection,
  PostsListHeader,
  Breadcrumbs,
  Pagination,
  AboutBlock,
  Container,
} from "../components";
import { PostEdge } from "../types";
import { useTheme } from "../core";
import { PAGES_ROUTES, POSTS_PER_PAGE } from "../constants";

interface DataType {
  mdx: {
    body: string;
  };
  allMdx: {
    edges: PostEdge[];
    totalCount: number;
  };
}

interface PageContextType {
  convertkitEndpoint: string;
}

const BlogPage = ({
  data: { allMdx },
  pageContext: { convertkitEndpoint },
}: PageProps<DataType, PageContextType>) => {
  const { theme } = useTheme();
  const pagesCount = Math.ceil(allMdx.totalCount / POSTS_PER_PAGE);

  return (
    <>
      <MainLayout title="Blog">
        <br />
        <Container>
          <Breadcrumbs
            items={[{ to: "/", label: "Home" }, { label: "Blog" }]}
          />
          <PostsListHeader title="Blog" theme={theme} />
          <PageGrid>
            <PostsSection>
              <PostsList posts={allMdx.edges} gridView="tile" />
            </PostsSection>
          </PageGrid>
          {pagesCount > 1 && (
            <Pagination
              routePath={PAGES_ROUTES.blog.index}
              theme={theme}
              currentPage={1}
              pagesCount={pagesCount}
            />
          )}
        </Container>
        <AboutBlock convertkitEndpoint={convertkitEndpoint} />
      </MainLayout>
    </>
  );
};

export const query = graphql`
  query BlogPage {
    mdx(frontmatter: { key: { eq: "short-about" } }) {
      body
    }
    allMdx(
      limit: 6
      filter: {
        fileAbsolutePath: { regex: "/content/" }
        frontmatter: { public: { in: true }, type: { eq: "blog" } }
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

export default BlogPage;
