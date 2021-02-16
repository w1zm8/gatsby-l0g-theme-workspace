import React, { FC } from "react";

import { useMailchimpSubscription, useTheme } from "../core";

import { StyleModules } from "../style-modules";

const styles = StyleModules.subscribingBlock;

export const SubscribingBlock: FC = () => {
  const { theme } = useTheme();
  const {
    email,
    result,
    handleChangeEmail,
    handleSubmit,
  } = useMailchimpSubscription();

  return (
    <div className={styles[theme]}>
      <h3>Join the Mailing List 💌</h3>
      <p>
        Be the first to know when I write new post. I also share my private
        materials with memebers of <strong>the Mailing List</strong>.
      </p>
      <p>
        I write about{" "}
        <strong>
          software development, TypeScript, testing, architecture and other
          stuff.
        </strong>
      </p>
      <p>
        Only interesting articles and useful materials.{" "}
        <strong>
          <i>No spam</i>
        </strong>
        .
      </p>
      {result ? (
        <p className={styles.result}>
          {result.result === "success" ? <span>👍</span> : <span>🛑</span>}
          {result.msg && <span> {result.msg}</span>}
        </p>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            className={styles.emailField}
            type="email"
            name="email"
            placeholder="Email address"
            onChange={handleChangeEmail}
            value={email}
          />
          <button className={styles.subscribeBtn}>Subscribe</button>
        </form>
      )}
    </div>
  );
};
