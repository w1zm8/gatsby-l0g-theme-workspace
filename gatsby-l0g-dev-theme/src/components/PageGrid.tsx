import React from "react";

import { StyleModules } from "../style-modules";

const styles = StyleModules.pageGrid;

interface PageGridProps {
  children: React.ReactNode;
}

export const PageGrid = ({ children }: PageGridProps) => {
  return <div className={styles.page}>{children}</div>;
};
