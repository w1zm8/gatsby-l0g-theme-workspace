import React from "react";
import { MDXProvider } from "@mdx-js/react";
import { Table } from "./src/components";
import { ThemeProvider } from "./src/core";

const components = {
  table: Table,
};

export const wrapRootElement = ({ element }) => (
  <MDXProvider components={components}>
    <ThemeProvider>{element}</ThemeProvider>
  </MDXProvider>
);
