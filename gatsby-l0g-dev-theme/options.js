const BLOG_SLUG_PREFIX = "/blog";
const POSTS_SLUG_PREFIX = "/posts";

const CONTENT_PATHS = {
  site: `src/site`,
  images: `src/images`,
  blog: `src/content${BLOG_SLUG_PREFIX}`,
  posts: `src/content${POSTS_SLUG_PREFIX}`,
};

const CONTENT_NAMES = {
  site: "site",
  blog: "blog",
  posts: "posts",
  images: "images",
};

const CONTENT_REQUIRED_FILES = {
  site: {
    greeting: {
      ext: "mdx",
      content: `---\nkey: "greeting"\n---`,
    },
    about: {
      ext: "mdx",
      content: `---\nkey: "about"\n---`,
    },
  },
};

const TEMPLATES = {
  postPage: `${__dirname}/src/templates/post-page.tsx`,
  tagsPage: `${__dirname}/src/templates/tags-page.tsx`,
  tagPostsPage: `${__dirname}/src/templates/tag-posts-page.tsx`,
  postsPage: `${__dirname}/src/templates/posts-page.tsx`,
};

// need to merge it with /src/constants.ts PAGES_ROUTES
const PAGES_ROUTES = {
  home: {
    index: "/",
  },
  blog: {
    index: "/blog",
    post: "/blog/article",
    pagination: "/blog/page",
  },
  tags: {
    index: "/tags",
  },
  about: {
    index: "/about",
  },
  contact: {
    index: "/contact",
  },
};

const POSTS_PER_PAGE = 6;

module.exports = {
  CONTENT_PATHS,
  CONTENT_NAMES,
  CONTENT_REQUIRED_FILES,
  BLOG_SLUG_PREFIX,
  TEMPLATES,
  PAGES_ROUTES,
  POSTS_PER_PAGE,
};
