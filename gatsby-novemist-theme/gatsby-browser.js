import React from "react";
import { MDXProvider } from "@mdx-js/react";
import { preToCodeBlock } from "mdx-utils";

import { Table, Code } from "./src/components";
import { ThemeProvider } from "./src/hooks";

const components = {
  table: Table,
  pre: (preProps) => {
    const props = preToCodeBlock(preProps);

    if (props) {
      return <Code {...props} />;
    }

    return <pre {...preProps} />;
  },
};

export const wrapRootElement = ({ element }) => (
  <MDXProvider components={components}>
    <ThemeProvider>{element}</ThemeProvider>
  </MDXProvider>
);
