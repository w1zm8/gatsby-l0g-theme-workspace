import { FluidObject } from "gatsby-image";
import { THEMES } from "./constants";

export type ThemeValue = typeof THEMES.light | typeof THEMES.dark;

export type GridViewValue = "row" | "tile";

export interface Post {
  title: string;
  slug: string;
  date: string;
  image: FluidObject;
  excerpt: string;
  tags: string[];
}

export interface PostEdge {
  node: {
    excerpt: string;
    frontmatter: {
      title: string;
      slug: string;
      date: string;
      tags: string[] | null;
      type: string | null;
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
