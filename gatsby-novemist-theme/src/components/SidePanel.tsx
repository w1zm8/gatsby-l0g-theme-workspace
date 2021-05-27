import React from "react";

import { Blurb } from "./Blurb";
import { Subscribing } from "./Subscribing";
import { SocialsBlock } from "./SocialsBlock";

import { useTheme } from "../hooks";

import { StyleModules } from "../style-modules";

const styles = StyleModules.sidePanel;

interface SidePanelProps {
  children?: React.ReactNode;
  convertkitEndpoint: string;
}

export const SidePanel = ({ children, convertkitEndpoint }: SidePanelProps) => {
  const { theme } = useTheme();

  return (
    <aside className={styles.panel}>
      <Subscribing theme={theme} convertkitEndpoint={convertkitEndpoint} />
      <Blurb theme={theme} />
      <SocialsBlock theme={theme} />
      {children}
    </aside>
  );
};
