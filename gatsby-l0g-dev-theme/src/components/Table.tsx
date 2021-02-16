import React from "react";

import { StyleModules } from "../style-modules";

const styles = StyleModules.table;

interface TableProps {
  children: React.ReactNode;
}

export const Table = ({ children }: TableProps) => {
  return (
    <div className={styles.wrapper}>
      <table>{children}</table>
    </div>
  );
};
