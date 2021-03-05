import React from "react";

import { Container, MainLayout, SEO } from "../components";
import { useTheme } from "../core";

const NotFoundPage = () => {
  const { theme } = useTheme();

  return (
    <MainLayout>
      <br />
      <Container>
        <SEO theme={theme} title="Page Not Found" />
        <h1>Page Not Found</h1>
      </Container>
    </MainLayout>
  );
};

export default NotFoundPage;
