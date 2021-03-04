import React, { FC } from "react";
import { useNavigate } from "@reach/router";
import { graphql, Link, PageProps } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { useTheme } from "../core";
import {
  Container,
  GoBackTo,
  MainLayout,
  SEO,
  TextContent,
} from "../components";

interface DataType {
  mdx: {
    body: string;
  };
}

const NotePage: FC<PageProps<DataType>> = ({ data }) => {
  const { theme } = useTheme();
  const { mdx } = data;
  const navigate = useNavigate();

  return (
    <MainLayout>
      <br />
      <Container>
        <SEO theme={theme} title="Notes" description="Digital Garden" />
        <article>
          <GoBackTo
            type="button"
            theme={theme}
            onClick={() => {
              navigate(-1);
            }}
          >
            Back
          </GoBackTo>
          <TextContent theme={theme}>
            <MDXRenderer>{mdx.body}</MDXRenderer>
            <Link to="/">Back Home</Link>
          </TextContent>
        </article>
      </Container>
    </MainLayout>
  );
};

export default NotePage;

export const query = graphql`
  query($slug: String!) {
    mdx(slug: { eq: $slug }) {
      body
    }
  }
`;
