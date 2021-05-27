import React, { FC } from "react";
import { graphql, PageProps } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";

import { useTheme } from "../hooks";
import {
  Container,
  GoBackTo,
  MainLayout,
  PostsListHeader,
  SEO,
  TextContent,
} from "../components";
import { PAGES_ROUTES } from "../constants";

interface DataType {
  mdx: {
    body: string;
    frontmatter: {
      title: string | null;
    };
  };
}

const NotesPage: FC<PageProps<DataType>> = ({ data }) => {
  const { theme } = useTheme();
  const { mdx } = data;

  return (
    <MainLayout>
      <br />
      <Container>
        <SEO
          theme={theme}
          title={mdx.frontmatter.title || "Notes"}
          description="Digital Garden"
        />
        <article>
          <GoBackTo type="link" theme={theme} to={PAGES_ROUTES.home.index}>
            Go Back To Home Page
          </GoBackTo>
          <PostsListHeader title="Notes" theme={theme} />
          <TextContent theme={theme}>
            <MDXRenderer>{mdx.body}</MDXRenderer>
          </TextContent>
        </article>
      </Container>
    </MainLayout>
  );
};

export default NotesPage;

export const query = graphql`
  query {
    mdx(slug: { eq: "site-notes-index" }) {
      body
      frontmatter {
        title
      }
    }
  }
`;
