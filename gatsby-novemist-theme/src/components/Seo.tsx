import React from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "@reach/router";
import { useStaticQuery, graphql } from "gatsby";

import { SiteQueryData, ThemeValue } from "../types";
import { DEFAULT_THEME } from "../constants";

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        defaultTitle: title
        titleTemplate
        defaultDescription: description
        siteUrl
        defaultImage: image
        twitterUsername
        keywords
      }
    }
  }
`;

interface SEOProps {
  title?: string;
  description?: string;
  image?: {
    src: string;
    height: string;
    width: string;
  };
  isArticle?: boolean;
  theme?: ThemeValue;
  keywords?: string[];
  isHomePage?: boolean;
}

export const SEO = ({
  title = "",
  description = "",
  image: metaImage,
  isArticle = false,
  theme = DEFAULT_THEME,
  keywords,
  isHomePage = false,
}: SEOProps) => {
  const { pathname } = useLocation();
  const { site } = useStaticQuery<SiteQueryData>(query);

  const {
    defaultTitle,
    titleTemplate,
    defaultDescription,
    siteUrl,
    defaultImage,
    twitterUsername,
  } = site.siteMetadata;
  const image =
    metaImage && metaImage.src
      ? `${site.siteMetadata.siteUrl}${metaImage.src}`
      : `${site.siteMetadata.siteUrl}/${defaultImage}`;
  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: image,
    url: `${siteUrl}${pathname}`,
  };
  const canonical = pathname ? `${site.siteMetadata.siteUrl}${pathname}` : null;
  const keywordsStr = keywords || site.siteMetadata.keywords;
  const metaTitle = isHomePage
    ? seo.title
    : titleTemplate.replace("%s", seo.title);

  return (
    <Helmet
      title={seo.title}
      titleTemplate={isHomePage ? seo.title : titleTemplate}
    >
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      {seo.url && <meta property="og:url" content={seo.url} />}
      {isArticle && <meta property="og:type" content="article" />}
      <meta property="og:title" content={metaTitle} />
      {seo.description && (
        <meta property="og:description" content={seo.description} />
      )}
      {canonical && <link rel="canonical" href={canonical} />}
      <meta name="keywords" content={keywordsStr.join(",")} />
      {seo.image && <meta property="og:image" content={seo.image} />}
      {metaImage && (
        <meta property="og:image:width" content={metaImage.width} />
      )}
      {metaImage && (
        <meta property="og:image:height" content={metaImage.height} />
      )}

      {/* <Twitter> */}
      <meta name="twitter:card" content="summary_large_image" />
      {twitterUsername && (
        <meta name="twitter:creator" content={`@${twitterUsername}`} />
      )}
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      {/* <Twitter /> */}

      <body className={`${theme}-theme`}></body>
    </Helmet>
  );
};
