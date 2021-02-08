import React, { FC } from "react";
import { graphql, useStaticQuery } from "gatsby";

import { useTheme } from "../core";

import styles from "../../styles/subscribing-block.module.css";

export interface SiteQueryData {
  site: {
    siteMetadata: {
      substackLink: string | null;
    };
  };
}

export const SubscribingBlock: FC = () => {
  const { theme } = useTheme();
  const { site } = useStaticQuery<SiteQueryData>(query);

  return (
    <div className={styles[theme]}>
      <h3>Join the Mailing List 💌</h3>
      <p>
        Be the first to know when I write new post. I also share my private
        materials with memebers of <strong>the Mailing List</strong>.
      </p>
      <p>
        I write about{" "}
        <strong>
          software development, TypeScript, testing, architecture and other
          stuff.
        </strong>
      </p>
      <p>
        Only interesting articles and useful materials.{" "}
        <strong>
          <i>No spam</i>
        </strong>
        .
      </p>
      <form className={styles.form}>
        <input
          className={styles.emailField}
          type="email"
          name="email"
          placeholder="Email address"
        />
        <button className={styles.subscribeBtn}>Subscribe</button>
      </form>
      {site.siteMetadata.substackLink && (
        <div>
          or{" "}
          <a href={site.siteMetadata.substackLink}>
            subscribe via <strong>Substack</strong>
          </a>
        </div>
      )}
    </div>
  );
};

const query = graphql`
  query SubscribingBlock {
    site {
      siteMetadata {
        substackLink
      }
    }
  }
`;
