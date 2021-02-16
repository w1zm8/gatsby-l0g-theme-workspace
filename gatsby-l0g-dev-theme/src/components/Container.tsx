import React from "react";

import { StyleModules } from "../style-modules";

const styles = StyleModules.container;

interface ContainerProps {
  children: React.ReactNode;
}

export const Container = ({ children }: ContainerProps) => {
  return <main className={styles.container}>{children}</main>;
};
