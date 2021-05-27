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
  SEO,
  SidePanel,
} from "../components";
import { PAGES_ROUTES } from "../constants";
import { useTheme } from "../hooks";
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
        <SEO theme={theme} title={tag ? `#${tag}` : "Tags"} />
        <Breadcrumbs
          items={[
            { to: "/", label: "Home" },
            { to: PAGES_ROUTES.tags.index, label: "Tags" },
            { label: tag },
          ]}
        />
        <PostsListHeader title={`#${tag}`} theme={theme} />
        <PageGrid>
          <SidePanel convertkitEndpoint={convertkitEndpoint} />
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
        </PageGrid>
      </Container>
    </MainLayout>
  );
};

export const query = graphql`
  query TagPostsPage($tagRegex: String!, $skip: Int!, $limit: Int!) {
    allMdx(
      limit: $limit
      skip: $skip
      filter: {
        fileAbsolutePath: { regex: "/content/" }
        frontmatter: { public: { in: true }, tags: { regex: $tagRegex } }
      }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      edges {
        node {
          excerpt
          slug
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
