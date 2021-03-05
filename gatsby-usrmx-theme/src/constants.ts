export const THEMES = {
  dark: "dark",
  light: "light",
} as const;

export const DEFAULT_THEME = THEMES.dark;

export const MAX_TAGS_COUNT = {
  block: 8, // in info-block that in side panel
  card: 6, // in post card
} as const;

export const MAX_POSTS_COUNT_HOME_PAGE = 6;

export const STORAGE_THEME_KEY = "_theme";
export const STORAGE_GRID_VIEW_KEY = "_gridview";

export const PAGES_ROUTES = {
  home: {
    index: "/",
  },
  blog: {
    index: "/blog",
    article: "/blog/article",
    pagination: "/blog/page",
  },
  tags: {
    index: "/tags",
  },
  feed: {
    index: "/",
    post: "/feed/post",
    paginationIndex: "/feed",
    pagination: "/feed/page",
  },
  about: {
    index: "/about",
  },
  notes: {
    index: "/notes",
  },
};

export const RESOURCES_TYPE_ROUTE = {
  blog: PAGES_ROUTES.blog.article,
  post: PAGES_ROUTES.feed.post,
  link: PAGES_ROUTES.feed.post,
};

export const HOME_PAGES_TYPE_ROUTE = {
  blog: PAGES_ROUTES.blog.index,
  post: PAGES_ROUTES.feed.index,
  link: PAGES_ROUTES.feed.index,
};

export const HOME_PAGES_TYPE_TITLES = {
  blog: "Go Back To Blog",
  post: "Go Back To Feed",
  link: "Go Back To Feed",
};

export const POSTS_PER_PAGE = 6;

export const POST_TYPES = {
  blog: "blog",
  post: "post",
};
