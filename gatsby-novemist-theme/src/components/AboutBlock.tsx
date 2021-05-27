import React, { FC } from "react";
import { graphql, useStaticQuery } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";

import { useTheme } from "../hooks";
import { Container } from "./Container";

import { InfoCard } from "./InfoCard";
import { Subscribing } from "./Subscribing";

import { StyleModules } from "../style-modules";
import { FullWidthWrapper } from "./FullWidthWrapper";
import { TwitterFollowButton } from "./TwitterFollowButton";
import { GitHubFollowButton } from "./GitHubFollowButton";
import { Icon } from "./Icon";
import { icons } from "../icons";

const styles = StyleModules.aboutBlock;

interface DataType {
  mdx: {
    body: string;
  };
  site: {
    siteMetadata: {
      twitterUsername: string;
      githubUsername: string;
    };
  };
}

interface AboutBlockProps {
  isColorishBg?: boolean;
  convertkitEndpoint: string;
}

export const AboutBlock: FC<AboutBlockProps> = ({
  isColorishBg = false,
  convertkitEndpoint,
}) => {
  const { mdx, site } = useStaticQuery<DataType>(query);
  const { theme } = useTheme();

  return (
    <FullWidthWrapper isColorish={isColorishBg}>
      <Container>
        <div className={styles.inner}>
          <InfoCard theme={theme}>
            <h2 className="monospace bold">
              About <Icon src={icons.emojiFloppy} widthSize="30px" />
            </h2>
            {mdx ? <MDXRenderer>{mdx.body}</MDXRenderer> : null}
            <div className={styles.socialButtons}>
              {site.siteMetadata.githubUsername && (
                <div>
                  <GitHubFollowButton
                    username={site.siteMetadata.githubUsername}
                  />
                </div>
              )}
              {site.siteMetadata.twitterUsername && (
                <TwitterFollowButton
                  username={site.siteMetadata.twitterUsername}
                />
              )}
            </div>
          </InfoCard>
          <Subscribing theme={theme} convertkitEndpoint={convertkitEndpoint} />
        </div>
      </Container>
    </FullWidthWrapper>
  );
};

const query = graphql`
  query AboutBlock {
    mdx(slug: { eq: "site-about-block" }) {
      body
    }
    site {
      siteMetadata {
        twitterUsername
        githubUsername
      }
    }
  }
`;
