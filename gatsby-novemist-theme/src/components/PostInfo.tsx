// import { Link } from "gatsby";
import React from "react";

// import { getFormattedDateString } from "../utils";

import { StyleModules } from "../style-modules";

const styles = StyleModules.postInfo;

interface PostInfoProps {
  date: string | null;
  // commentsCount: number;
  // postLink?: string;
}

export const PostInfo = ({
  date,
}: // commentsCount,
// postLink = "",
PostInfoProps) => {
  return (
    <div className={styles.info}>
      {date && <time dateTime={date}>{date}</time>}
      {/* <span> | </span> */}
      {/* <Link to={`${postLink}#comments`}>{`${commentsCount} ${
        commentsCount === 1 ? "comment" : "comments"
      }`}</Link> */}
    </div>
  );
};

export default PostInfo;
