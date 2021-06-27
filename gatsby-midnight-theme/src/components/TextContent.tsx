import React from "react";
import Img, { FluidObject } from "gatsby-image";

import { ThemeValue } from "../types";
import { DEFAULT_THEME } from "../constants";

import { StyleModules } from "../style-modules";

const styles = StyleModules.textContent;

interface TextContentProps {
  children?: React.ReactNode;
  theme?: ThemeValue;
  image?: FluidObject;
  imageCopyright?: string;
  imageCopyrightUrl?: string;
}

export const TextContent = ({
  children,
  image,
  theme = DEFAULT_THEME,
  imageCopyright,
  imageCopyrightUrl,
}: TextContentProps) => {
  return (
    <div className={styles[theme]}>
      {image && (
        <div className={styles.image}>
          <Img className={styles.imageInner} fluid={image}></Img>
          {imageCopyright && (
            <div
              style={{
                fontSize: "14px",
                textAlign: "right",
                marginTop: "10px",
                marginRight: "20px",
              }}
            >
              Photo by{" "}
              {imageCopyrightUrl ? (
                <a href={imageCopyrightUrl}>{imageCopyright}</a>
              ) : (
                imageCopyright
              )}
            </div>
          )}
        </div>
      )}
      <div className={styles.inner}>{children}</div>
    </div>
  );
};

export default TextContent;
