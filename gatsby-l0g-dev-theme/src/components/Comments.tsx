import React, { FC } from "react";
import { useTheme, useUtterancesComments } from "../core";
import { icons } from "../icons";
import { UtterancesConfig } from "../types";
import { Icon } from "./Icon";

interface CommentsProps {
  utterancesConfig: UtterancesConfig;
}

export const Comments: FC<CommentsProps> = ({ utterancesConfig }) => {
  const { theme } = useTheme();
  const { commentBlockRef } = useUtterancesComments({
    options: {
      theme,
      ...utterancesConfig,
    },
  });

  return (
    <>
      <h3 className="monospace text-center bold">
        Comments <Icon src={icons.emojiSpeechBalloon} widthSize="25px" />
      </h3>
      <div ref={commentBlockRef} />
    </>
  );
};
