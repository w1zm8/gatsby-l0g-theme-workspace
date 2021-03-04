import React from "react";
import { graphql, PageProps } from "gatsby";
import { FixedObject, FluidObject } from "gatsby-image";
import { MDXRenderer } from "gatsby-plugin-mdx";

import {
  MainLayout,
  PostInfo,
  PostTags,
  TextContent,
  SEO,
  GoBackTo,
  AboutBlock,
  Container,
  Comments,
  RelatedPosts,
  PostShareButtons,
} from "../components";

import { useTheme } from "../core";
import { PostEdge, PostType, UtterancesConfig } from "../types";
import {
  HOME_PAGES_TYPE_ROUTE,
  HOME_PAGES_TYPE_TITLES,
  RESOURCES_TYPE_ROUTE,
} from "../constants";

interface DataType {
  mdx: {
    excerpt: string;
    frontmatter: {
      slug: string;
      type: PostType | null;
      date: string;
      title: string;
      tags: string[] | null;
      image: {
        childImageSharp: {
          fluid: FluidObject;
          resize: {
            src: string;
            height: string;
            width: string;
          };
        };
      };
      keywords?: string[];
    };
    body: string;
  };
  allMdx: {
    edges: PostEdge[];
  };
}

interface PageContextType {
  id: string;
  relatedPostsIds: string[];
  utterancesConfig: UtterancesConfig;
  convertkitEndpoint: string;
}

const PostPage = ({
  data: {
    mdx: { frontmatter, body, excerpt },
    allMdx,
  },
  pageContext: { utterancesConfig, convertkitEndpoint },
}: PageProps<DataType, PageContextType>) => {
  const { theme } = useTheme();
  const { type, image, title, date, tags, keywords } = frontmatter;
  const goBackToUrl = type ? HOME_PAGES_TYPE_ROUTE[type] : "/";
  const goBackTitle = type ? HOME_PAGES_TYPE_TITLES[type] : "";
  const postUrl = type
    ? `${RESOURCES_TYPE_ROUTE[type]}/${frontmatter.slug}`
    : "/";

  return (
    <MainLayout>
      <br />
      <Container>
        <SEO
          theme={theme}
          image={image?.childImageSharp?.resize}
          title={title}
          description={excerpt}
          keywords={keywords}
        />
        <article
          className="article"
          style={{
            width: "100%",
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >
          <GoBackTo type="link" to={goBackToUrl} theme={theme}>
            {goBackTitle}
          </GoBackTo>
          <TextContent theme={theme} image={image?.childImageSharp?.fluid}>
            <header>
              <h1>{title}</h1>
              <PostInfo date={date} />
              <PostTags tags={tags || []} />
              <hr />
            </header>
            {body && (
              <MDXRenderer convertkitEndpoint={convertkitEndpoint}>
                {body}
              </MDXRenderer>
            )}
            <PostShareButtons postTitle={title} postUrl={postUrl} />
          </TextContent>
        </article>
      </Container>
      <AboutBlock isColorishBg convertkitEndpoint={convertkitEndpoint} />
      <Container>
        <Comments utterancesConfig={utterancesConfig} />
      </Container>
      {allMdx.edges.length > 0 && <RelatedPosts posts={allMdx.edges} />}
    </MainLayout>
  );
};

export const query = graphql`
  query PostPage($id: String!, $relatedPostsIds: [String]!) {
    mdx(id: { eq: $id }) {
      excerpt(pruneLength: 160)
      frontmatter {
        slug
        type
        title
        date
        tags
        image {
          childImageSharp {
            fluid(maxWidth: 1200) {
              ...GatsbyImageSharpFluid
            }
            resize(width: 1200) {
              src
              height
              width
            }
          }
        }
        keywords
      }
      body
    }
    allMdx(filter: { id: { in: $relatedPostsIds } }) {
      edges {
        node {
          id
          frontmatter {
            type
            slug
            title
            date
            tags
            image {
              childImageSharp {
                fluid(maxWidth: 1200) {
                  ...GatsbyImageSharpFluid
                }
                fixed {
                  src
                }
              }
            }
          }
          excerpt
        }
      }
    }
  }
`;

export default PostPage;
