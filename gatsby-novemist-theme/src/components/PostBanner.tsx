import React, { FC } from "react";

import { useTheme, useConvertkitEmailSubscription } from "../hooks";

import { StyleModules } from "../style-modules";
import { Icon } from "./Icon";

const styles = StyleModules.postBanner;

interface PostBannerProps {
  convertkitEndpoint: string;
  title: string;
  content: React.ReactNode;
  btnTitle: string;
  iconSrc?: string;
  iconSize?: string;
  successView: React.ReactNode;
  errorView: React.ReactNode;
}

export const PostBanner: FC<PostBannerProps> = ({
  convertkitEndpoint,
  title,
  content,
  btnTitle,
  iconSrc,
  iconSize = "25px",
  successView,
  errorView,
}) => {
  const { theme } = useTheme();
  const {
    handleSubmit,
    handleChangeEmail,
    email,
    isInitialStatus,
    isErrorStatus,
    isSuccessStatus,
  } = useConvertkitEmailSubscription({ endpoint: convertkitEndpoint });

  return (
    <div className={styles[theme]}>
      <h3>
        {title} {iconSrc && <Icon src={iconSrc} widthSize={iconSize} />}
      </h3>
      <div>{content}</div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.emailField}
          type="email"
          name="email_address"
          placeholder="Email address"
          onChange={handleChangeEmail}
          value={email}
        />
        <button className={styles.subscribeBtn}>{btnTitle}</button>
      </form>
      {!isInitialStatus && (
        <div className={styles.result}>
          {isSuccessStatus && successView}
          {isErrorStatus && errorView}
        </div>
      )}
    </div>
  );
};
