import React, { FC } from "react";
import { graphql, PageProps } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { useTheme } from "../core";
import {
  AboutBlock,
  Container,
  GoBackTo,
  MainLayout,
  PostShareButtons,
  PostTags,
  SEO,
  TextContent,
} from "../components";
import { PAGES_ROUTES, RESOURCES_TYPE_ROUTE } from "../constants";

interface DataType {
  mdx: {
    body: string;
    excerpt: string | null;
    frontmatter: {
      tags: [] | null;
      keywords: string[] | null;
    };
  };
}

interface PageContextType {
  title: string | null;
  slug: string;
  convertkitEndpoint: string | null;
}

const NotePage: FC<PageProps<DataType, PageContextType>> = ({
  data,
  pageContext,
}) => {
  const { theme } = useTheme();
  const { mdx } = data;
  const { title, slug, convertkitEndpoint } = pageContext;
  const postUrl = `${RESOURCES_TYPE_ROUTE.note}/${slug}`;

  console.log("data", data);

  return (
    <MainLayout>
      <br />
      <Container>
        <SEO
          theme={theme}
          title={title || "Note"}
          description={data.mdx.excerpt}
          keywords={data.mdx.frontmatter.keywords}
        />
        <article>
          <GoBackTo
            type="link"
            theme={theme}
            to={`${PAGES_ROUTES.notes.index}`}
          >
            Go Back To Notes
          </GoBackTo>
          <TextContent theme={theme}>
            <header>
              <PostTags tags={mdx.frontmatter.tags || []} />
              <hr />
            </header>
            <MDXRenderer>{mdx.body}</MDXRenderer>
            <PostShareButtons postTitle={title || "Note"} postUrl={postUrl} />
          </TextContent>
        </article>
      </Container>
      {convertkitEndpoint && (
        <AboutBlock isColorishBg convertkitEndpoint={convertkitEndpoint} />
      )}
    </MainLayout>
  );
};

export default NotePage;

export const query = graphql`
  query($slug: String!) {
    mdx(slug: { eq: $slug }) {
      body
      excerpt
      frontmatter {
        tags
        keywords
      }
    }
  }
`;
