import React from "react";

import styles from "../../styles/table.module.css";

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
