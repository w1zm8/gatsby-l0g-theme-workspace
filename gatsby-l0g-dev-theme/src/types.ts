import { FluidObject } from "gatsby-image";
import { THEMES } from "./constants";

export type ThemeValue = typeof THEMES.light | typeof THEMES.dark;

export type GridViewValue = "row" | "tile";

export type PostType = "post" | "blog" | "link";

export interface Post {
  title: string;
  slug: string;
  date: string;
  image: FluidObject;
  excerpt: string;
  tags: string[];
  type: PostType | null;
}

export interface PostEdge {
  node: {
    excerpt: string;
    frontmatter: {
      title: string;
      slug: string;
      date: string;
      tags: string[] | null;
      type: PostType | null;
      image: {
        childImageSharp: {
          fluid: FluidObject;
        };
      };
    };
  };
}

export interface SiteQueryData {
  site: {
    siteMetadata: {
      defaultTitle: string;
      titleTemplate: string;
      defaultDescription: string;
      siteUrl: string;
      defaultImage: string;
      twitterUsername: string;
      logoTitle: string;
    };
  };
}

export interface NavItem {
  path: string;
  name: string;
}

export interface MailchimpResponse {
  msg: string;
  result: string;
}

export interface UtterancesConfig {
  repo: string;
  issueTerm: string;
  label: string;
  id: string;
}
