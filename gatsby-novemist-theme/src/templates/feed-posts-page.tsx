import React from "react";
import { graphql, PageProps } from "gatsby";
import {
  MainLayout,
  PageGrid,
  PostsList,
  PostsListHeader,
  PostsSection,
  SEO,
  Pagination,
  SidePanel,
  TagsBlock,
  Container,
} from "../components";
import { useTheme } from "../hooks";
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

export const FeedPostsPage = ({
  data: { allMdx },
  pageContext: { currentPage, pagesCount, convertkitEndpoint },
}: PageProps<DataType, PageContextType>) => {
  const { theme } = useTheme();

  return (
    <MainLayout title="Feed">
      <br />
      <Container>
        {/* <SEO
          theme={theme}
          image={frontmatter.image.childImageSharp.fixed.src}
          title={frontmatter.title}
          description={excerpt}
        /> */}
        <PostsListHeader title="Feed" theme={theme} />
        <PageGrid>
          <SidePanel convertkitEndpoint={convertkitEndpoint}>
            <TagsBlock theme={theme} />
          </SidePanel>
          <PostsSection>
            <PostsList posts={allMdx.edges} gridView="row" />
            <Pagination
              pageRoutePath={PAGES_ROUTES.feed.pagination}
              routePath={PAGES_ROUTES.feed.index}
              theme={theme}
              currentPage={currentPage}
              pagesCount={pagesCount}
            />
          </PostsSection>
        </PageGrid>
      </Container>
    </MainLayout>
  );
};

export const query = graphql`
  query FeedPostsPage($skip: Int!, $limit: Int!) {
    allMdx(
      limit: $limit
      skip: $skip
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

export default FeedPostsPage;
