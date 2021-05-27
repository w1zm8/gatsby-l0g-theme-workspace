import React from "react";

import { ThemeValue } from "../types";
import { InfoCard } from "./InfoCard";
import { Icon } from "./Icon";

import { useConvertkitEmailSubscription } from "../hooks";
import { StyleModules } from "../style-modules";
import { icons } from "../icons";

const styles = StyleModules.subscribing;

interface SubscribingProps {
  theme?: ThemeValue;
  convertkitEndpoint: string;
}

export const Subscribing = ({
  theme = "dark",
  convertkitEndpoint,
}: SubscribingProps) => {
  const {
    FORM_URL,
    handleSubmit,
    handleChangeEmail,
    email,
    isInitialStatus,
    isSuccessStatus,
    isErrorStatus,
  } = useConvertkitEmailSubscription({ endpoint: convertkitEndpoint });

  return (
    <InfoCard theme={theme} variant="colorful">
      <div className={styles[theme]}>
        <h4 className="monospace">
          <span>Join the Mailing List </span>
          <Icon src={icons.emojiEnvelope} widthSize="25px" />
        </h4>
        <div>
          <form onSubmit={handleSubmit} action={FORM_URL} method="post">
            <input
              aria-label="Your email"
              type="email"
              name="email_address"
              placeholder="Email address"
              value={email}
              onChange={handleChangeEmail}
              required
            />
            <button type="submit">Subscribe</button>
          </form>
          {!isInitialStatus && (
            <div>
              {isSuccessStatus && (
                <div className={styles.resultSuccess}>
                  <Icon src={icons.emojiSparkles} widthSize="20px" />
                  <i>Please go confirm your subscription!</i>
                </div>
              )}
              {isErrorStatus && (
                <div className={styles.resultError}>
                  <Icon src={icons.emojiPoliceCarLight} widthSize="20px" />
                  <i>Oops, Something went wrong! Try again.</i>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </InfoCard>
  );
};
