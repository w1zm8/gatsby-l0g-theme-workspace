const BLOG_SLUG_PREFIX = "/blog";
const POSTS_SLUG_PREFIX = "/posts";
const NOTES_SLUG_PREFIX = "/notes";

const CONTENT_PATHS = {
  site: `src/site`,
  images: `content/images`,
  blog: `content${BLOG_SLUG_PREFIX}`,
  posts: `content${POSTS_SLUG_PREFIX}`,
  notes: `content${NOTES_SLUG_PREFIX}`,
};

const CONTENT_NAMES = {
  site: "site",
  blog: "blog",
  posts: "posts",
  images: "images",
  notes: "notes",
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
  homePage: `${__dirname}/src/templates/index-page.tsx`,
  blogPage: `${__dirname}/src/templates/blog-page.tsx`,
  postPage: `${__dirname}/src/templates/post-page.tsx`,
  tagsPage: `${__dirname}/src/templates/tags-page.tsx`,
  tagPostsPage: `${__dirname}/src/templates/tag-posts-page.tsx`,
  blogPostsPage: `${__dirname}/src/templates/blog-posts-page.tsx`,
  feedPostsPage: `${__dirname}/src/templates/feed-posts-page.tsx`,
  notePage: `${__dirname}/src/templates/note-page.tsx`,
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
  feed: {
    index: "/",
    post: "/feed/post",
    pagination: "/feed/page",
  },
  about: {
    index: "/about",
  },
  contact: {
    index: "/contact",
  },
  notes: {
    index: "/notes",
  },
};

const POSTS_PER_PAGE = 6;

const POST_TYPES = {
  blog: "blog",
  post: "post",
  link: "link",
};

const RELATED_POSTS_COUNT = 1;

module.exports = {
  CONTENT_PATHS,
  CONTENT_NAMES,
  CONTENT_REQUIRED_FILES,
  BLOG_SLUG_PREFIX,
  TEMPLATES,
  PAGES_ROUTES,
  POSTS_PER_PAGE,
  POST_TYPES,
  RELATED_POSTS_COUNT,
};
