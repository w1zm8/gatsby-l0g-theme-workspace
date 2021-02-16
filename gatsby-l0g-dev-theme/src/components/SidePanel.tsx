import { graphql, useStaticQuery } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import React from "react";

import { InfoCard } from "./InfoCard";
import { Subscribing } from "./Subscribing";
import { SocialsBlock } from "./SocialsBlock";

import { useTheme } from "../core";

import { StyleModules } from "../style-modules";

const styles = StyleModules.sidePanel;

interface SidePanelProps {
  children?: React.ReactNode;
}

interface DataType {
  mdx: {
    body: string;
  };
}

export const SidePanel = ({ children }: SidePanelProps) => {
  const { theme } = useTheme();
  const { mdx } = useStaticQuery<DataType>(query);

  return (
    <aside className={styles.panel}>
      <InfoCard theme={theme}>
        {mdx ? <MDXRenderer>{mdx.body}</MDXRenderer> : null}
      </InfoCard>
      <Subscribing theme={theme} />
      <SocialsBlock theme={theme} />
      {children}
    </aside>
  );
};

const query = graphql`
  query SidePanel {
    mdx(frontmatter: { key: { eq: "blurb" } }) {
      body
    }
  }
`;
