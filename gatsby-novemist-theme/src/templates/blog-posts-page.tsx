import React from "react";
import { graphql, PageProps } from "gatsby";
import {
  Breadcrumbs,
  MainLayout,
  PageGrid,
  PostsList,
  PostsListHeader,
  PostsSection,
  SEO,
  Pagination,
  Container,
  AboutBlock,
} from "../components";
import { useTheme } from "../core";
import { PostEdge } from "../types";
import { PAGES_ROUTES } from "../constants";

interface DataType {
  allMdx: {
    edges: PostEdge[];
    totalCount: number;
  };
}

interface PageContextType {
  limit: number;
  skip: number;
  currentPage: number;
  pagesCount: number;
  convertkitEndpoint: string;
}

export const BlogPostsPage = ({
  data: { allMdx },
  pageContext: { currentPage, pagesCount, convertkitEndpoint },
}: PageProps<DataType, PageContextType>) => {
  const { theme } = useTheme();

  return (
    <MainLayout title="Blog">
      <br />
      <Container>
        <SEO
          theme={theme}
          // title={frontmatter.title}
        />
        <Breadcrumbs items={[{ to: "/", label: "Home" }, { label: "Blog" }]} />
        <PostsListHeader title="Blog" theme={theme} />
        <PageGrid>
          <PostsSection>
            <PostsList posts={allMdx.edges} gridView="tile" />
          </PostsSection>
        </PageGrid>
        <Pagination
          routePath={PAGES_ROUTES.blog.index}
          theme={theme}
          currentPage={currentPage}
          pagesCount={pagesCount}
        />
      </Container>
      <AboutBlock convertkitEndpoint={convertkitEndpoint} />
    </MainLayout>
  );
};

export const query = graphql`
  query BlogPostsPage($skip: Int!, $limit: Int!) {
    allMdx(
      limit: $limit
      skip: $skip
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

export default BlogPostsPage;
