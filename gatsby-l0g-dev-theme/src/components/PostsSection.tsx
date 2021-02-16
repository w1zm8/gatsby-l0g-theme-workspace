import React, { CSSProperties } from "react";

import { StyleModules } from "../style-modules";

const styles = StyleModules.postsSection;

interface PostsSectionProps {
  children: React.ReactNode;
  style?: CSSProperties;
}

export const PostsSection = ({ children, style }: PostsSectionProps) => {
  return (
    <section className={styles.section} style={style}>
      {children}
    </section>
  );
};
