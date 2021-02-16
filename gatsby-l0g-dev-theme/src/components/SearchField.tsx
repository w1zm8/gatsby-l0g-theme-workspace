import React from "react";

import { StyleModules } from "../style-modules";

const styles = StyleModules.searchField;

export const SearchField = () => {
  return (
    <input
      className={styles.field}
      type="search"
      placeholder="Search for post..."
      name="search"
    />
  );
};
