import React from "react";
import { graphql, useStaticQuery } from "gatsby";

import { ThemeValue } from "../types";
import { InfoCard } from "./InfoCard";
import { icons, IconsKeys } from "../icons";

import { StyleModules } from "../style-modules";

const styles = StyleModules.socialsBlock;

interface SocialsBlockProps {
  theme?: ThemeValue;
}

const query = graphql`
  query SocialsBlock {
    site {
      siteMetadata {
        socials {
          name
          url
          icon
        }
      }
    }
  }
`;

interface SiteQueryData {
  site: {
    siteMetadata: {
      socials:
        | [
            {
              name: string;
              url: string;
              icon: IconsKeys;
            }
          ]
        | null;
    };
  };
}

export const SocialsBlock = ({ theme }: SocialsBlockProps) => {
  const {
    site: { siteMetadata },
  } = useStaticQuery<SiteQueryData>(query);

  return (
    <InfoCard theme={theme}>
      <div className={styles.block}>
        {/* <h3>On The Web</h3> */}
        {siteMetadata.socials && (
          <nav>
            {siteMetadata.socials.map((item, index) => (
              <a
                key={`social-${index}`}
                href={item.url}
                className="theme-link monospace"
                target="_blank"
              >
                <img src={icons[item.icon]} alt="" />
                <span>{item.name}</span>
              </a>
            ))}
          </nav>
        )}
      </div>
    </InfoCard>
  );
};
