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
}

export const TextContent = ({
  children,
  image,
  theme = DEFAULT_THEME,
}: TextContentProps) => {
  return (
    <div className={styles[theme]}>
      {image && (
        <div className={styles.image}>
          <Img className={styles.imageInner} fluid={image}></Img>
        </div>
      )}
      <div className={styles.inner}>{children}</div>
    </div>
  );
};

export default TextContent;
