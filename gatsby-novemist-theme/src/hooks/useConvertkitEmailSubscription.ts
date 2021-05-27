import { useMemo, useState } from "react";

export const STATUS_INITIAL = "STATUS_INITIAL";
export const STATUS_SUCCESS = "STATUS_SUCCESS";
export const STATUS_ERROR = "STATUS_ERROR";

type Status =
  | typeof STATUS_INITIAL
  | typeof STATUS_SUCCESS
  | typeof STATUS_ERROR;

interface UseConvertkitEmailSubscriptionConfig {
  endpoint: string;
}

export const useConvertkitEmailSubscription = ({
  endpoint,
}: UseConvertkitEmailSubscriptionConfig) => {
  const [status, setStatus] = useState<Status>(STATUS_INITIAL);
  const [email, setEmail] = useState("");

  const FORM_URL = endpoint;

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const data = new FormData(e.target);

    try {
      const response = await fetch(FORM_URL, {
        method: "post",
        body: data,
        headers: {
          accept: "application/json",
        },
      });
      setEmail("");
      const json = await response.json();

      if (json.status === "success") {
        setStatus(STATUS_SUCCESS);
        return;
      }
    } catch (err) {
      setStatus(STATUS_ERROR);
    }
  };

  const handleChangeEmail = (event: any) => {
    const { value } = event.target;
    setEmail(value);
  };

  const handleTryAgain = () => {
    setStatus(STATUS_INITIAL);
  };

  const isInitialStatus = useMemo(() => status === STATUS_INITIAL, [status]);
  const isSuccessStatus = useMemo(() => status === STATUS_SUCCESS, [status]);
  const isErrorStatus = useMemo(() => status === STATUS_ERROR, [status]);

  return {
    email,
    handleSubmit,
    handleChangeEmail,
    handleTryAgain,
    FORM_URL,
    isInitialStatus,
    isSuccessStatus,
    isErrorStatus,
  };
};
