import React from "react";

import { PostCard } from "./PostCard";

import { GridViewValue, PostEdge } from "../types";
import { getMappedPosts } from "../utils";

import { StyleModules } from "../style-modules";

interface PostsListProps {
  posts: PostEdge[];
  gridView: GridViewValue;
}

export const PostsList = ({ posts: postsEdges, gridView }: PostsListProps) => {
  const posts = getMappedPosts(postsEdges);

  return (
    <div className={StyleModules.postsList.list}>
      {posts.map((post) => (
        <PostCard key={post.slug} {...post} view={gridView} />
      ))}
    </div>
  );
};
