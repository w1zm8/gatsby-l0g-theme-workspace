import React, { FC } from "react";
import { useTheme } from "../hooks";

import { StyleModules } from "../style-modules";

const styles = StyleModules.fullWidthWrapper;

interface FullWidthWrapperProps {
  isColorish?: boolean;
}

export const FullWidthWrapper: FC<FullWidthWrapperProps> = ({
  children,
  isColorish = false,
}) => {
  const { theme } = useTheme();
  const styleName = isColorish ? `${theme}` : "wrapper";

  return <div className={styles[styleName]}>{children}</div>;
};
