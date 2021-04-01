import React from "react";
import { PageProps, graphql } from "gatsby";

import {
  PageGrid,
  MainLayout,
  PostsList,
  TagsBlock,
  SidePanel,
  PostsSection,
  PostsListHeader,
  Pagination,
  Container,
} from "../components";
import { PostEdge } from "../types";
import { useTheme } from "../core";
import { PAGES_ROUTES, POSTS_PER_PAGE } from "../constants";

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

interface PageContextType {
  convertkitEndpoint: string;
}

const IndexPage = ({
  data: { allMdx },
  pageContext: { convertkitEndpoint },
}: PageProps<DataType, PageContextType>) => {
  const { theme } = useTheme();
  const pagesCount = Math.ceil(allMdx.totalCount / POSTS_PER_PAGE);

  return (
    <MainLayout isHomePage>
      <br />
      <Container>
        <PostsListHeader title="Feed" theme={theme} />
        <PageGrid>
          <PostsSection>
            <PostsList posts={allMdx.edges} gridView="row" />
            {pagesCount > 1 && (
              <Pagination
                routePath={PAGES_ROUTES.feed.paginationIndex}
                theme={theme}
                currentPage={1}
                pagesCount={pagesCount}
              />
            )}
          </PostsSection>
          <SidePanel convertkitEndpoint={convertkitEndpoint}>
            <TagsBlock theme={theme} />
          </SidePanel>
        </PageGrid>
      </Container>
    </MainLayout>
  );
};

export const query = graphql`
  query HomePage {
    allMdx(
      limit: 6
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
