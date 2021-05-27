const fs = require("fs");
const {
  CONTENT_PATHS,
  CONTENT_REQUIRED_FILES,
  TEMPLATES,
  PAGES_ROUTES,
  POSTS_PER_PAGE,
  POST_TYPES,
  RELATED_POSTS_COUNT,
} = require("./options");

const UTTERANCES_CONFIG = {
  repo: process.env.UTTERANCES_REPO,
  issueTerm: process.env.UTTERANCES_ISSUETERM,
  label: process.env.UTTERANCES_LABEL,
  id: process.env.UTTERANCES_ID,
};

const getRelatedPostsIds = (currentPost, posts) => {
  const tags = currentPost.node.frontmatter.tags;
  const relatedPosts = posts
    .filter((post) => {
      if (post.node.frontmatter.slug === currentPost.node.frontmatter.slug) {
        return false;
      }
      const postTags = post.node.frontmatter.tags;

      return postTags.some((postTag) => tags.includes(postTag));
    })
    .sort((a, b) => {
      const aTags = a.node.frontmatter.tags;
      const bTags = b.node.frontmatter.tags;
      let aTagsCount = 0;
      let bTagsCount = 0;

      tags.forEach((tag) => {
        if (aTags.includes(tag)) {
          aTagsCount++;
        }
        if (bTags.includes(tag)) {
          bTagsCount++;
        }
      });

      return bTagsCount - aTagsCount;
    })
    .map(({ node }) => node.id)
    .slice(0, RELATED_POSTS_COUNT);

  return relatedPosts;
};

// replace with "src/utils/getTagsFromPosts.ts"
const getTagsFromPosts = (posts) =>
  posts
    .map(
      ({
        node: {
          frontmatter: { tags },
        },
      }) => {
        if (!tags) {
          return [];
        }

        return tags.map((tag) => tag.toLowerCase());
      }
    )
    .filter(Boolean)
    .flat();

const getTagsCount = (tags) =>
  tags.reduce((acc, tag) => ({ ...acc, [tag]: (acc[tag] || 0) + 1 }), {});

const createRequiredFiles = (path, reporter, requiredFiles = {}) => {
  const requiredFilesNames = Object.keys(requiredFiles);

  if (!requiredFilesNames.length) {
    return;
  }

  requiredFilesNames.forEach((fileName) => {
    const { ext, content } = requiredFiles[fileName];

    if (!ext || !content) {
      return;
    }

    const filePath = `${path}/${fileName}.${ext}`;

    if (fs.existsSync(filePath)) {
      return;
    }

    reporter.info(`creating the ${filePath} file`);
    fs.writeFileSync(filePath, content);
  });
};

const createNonExistentFolder = (path, reporter) => {
  if (!fs.existsSync(path)) {
    reporter.info(`creating the ${path} directory`);
    fs.mkdirSync(path, { recursive: true });
  }
};

const createPaginationPage = (
  createPage,
  pagesCount,
  path,
  index,
  templateSrc
) => {
  const isFirstPage = index === 0;
  const currentPage = index + 1;

  if (isFirstPage) {
    return;
  }

  createPage({
    path: `${path}/${currentPage}`,
    component: templateSrc,
    context: {
      limit: POSTS_PER_PAGE,
      skip: index * POSTS_PER_PAGE,
      currentPage,
      pagesCount,
      convertkitEndpoint: process.env.CONVERTKIT_ENDPOINT,
    },
  });
};

const createPostPage = (
  createPage,
  currentPost,
  index,
  posts,
  relatedPosts,
  path,
  templateSrc
) => {
  const relatedPostsIds = getRelatedPostsIds(currentPost, relatedPosts);

  // const prevPost = index === 0 ? null : posts[index - 1];
  // const nextPost = index === posts.length - 1 ? null : posts[index + 1];

  createPage({
    path: `${path}/${currentPost.node.frontmatter.slug}`,
    component: templateSrc,
    context: {
      id: currentPost.node.id,
      relatedPostsIds,
      utterancesConfig: UTTERANCES_CONFIG,
      convertkitEndpoint: process.env.CONVERTKIT_ENDPOINT,
      // nextPost,
      // prevPost,
    },
  });
};

const onPreBootstrap = ({ reporter }) => {
  createNonExistentFolder(
    CONTENT_PATHS.site,
    reporter,
    CONTENT_REQUIRED_FILES.site
  );
  createRequiredFiles(
    CONTENT_PATHS.site,
    reporter,
    CONTENT_REQUIRED_FILES.site
  );
  createNonExistentFolder(CONTENT_PATHS.blog, reporter);
};

const createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  createPage({
    path: "/",
    component: TEMPLATES.homePage,
    context: {
      convertkitEndpoint: process.env.CONVERTKIT_ENDPOINT,
    },
  });

  createPage({
    path: "/blog",
    component: TEMPLATES.blogPage,
    context: {
      convertkitEndpoint: process.env.CONVERTKIT_ENDPOINT,
    },
  });

  const postsResult = await graphql(`
    query {
      allMdx(
        filter: {
          fileAbsolutePath: { regex: "/content/" }
          frontmatter: { public: { in: true } }
        }
        sort: { fields: frontmatter___date, order: ASC }
      ) {
        edges {
          node {
            id
            frontmatter {
              type
              slug
              tags
              title
              date
            }
          }
        }
      }
    }
  `);

  if (postsResult.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query');
  }

  const allResources = postsResult.data.allMdx.edges;
  const allPosts = allResources.filter(
    ({ node }) =>
      node.frontmatter.type !== null &&
      node.frontmatter.type !== POST_TYPES.note
  );
  const blogPosts = allPosts.filter(
    ({ node }) => node.frontmatter.type === POST_TYPES.blog
  );
  const feedPosts = allPosts.filter(
    ({ node }) =>
      node.frontmatter.type === POST_TYPES.post ||
      node.frontmatter.type === POST_TYPES.link
  );

  // ------------ CREATING PAGES FOR EACH PUBLIC BLOG POST ------------

  blogPosts.forEach((currentPost, index) => {
    createPostPage(
      createPage,
      currentPost,
      index,
      blogPosts,
      allPosts,
      PAGES_ROUTES.blog.post,
      TEMPLATES.postPage
    );
  });

  // ------------ CREATING PAGES FOR EACH PUBLIC FEED POST ------------

  feedPosts.forEach((currentPost, index) => {
    createPostPage(
      createPage,
      currentPost,
      index,
      feedPosts,
      allPosts,
      PAGES_ROUTES.feed.post,
      TEMPLATES.postPage
    );
  });

  // ------------ CREATING PAGE FOR ALL TAGS ------------

  const allTags = getTagsFromPosts(allResources);
  const tagPostsCount = getTagsCount(allTags);
  const tags = Array.from(new Set(allTags).values());

  createPage({
    path: PAGES_ROUTES.tags.index,
    component: TEMPLATES.tagsPage,
    context: {
      tags,
      tagPostsCount,
      convertkitEndpoint: process.env.CONVERTKIT_ENDPOINT,
    },
  });

  // ------------ CREATING PAGES FOR TAG'S POSTS ------------

  tags.forEach((tag) => {
    const tagPagesCount = Math.ceil(tagPostsCount[tag] / POSTS_PER_PAGE);

    Array.from({ length: tagPagesCount }).forEach((_, index) => {
      const isFirstPage = index === 0;
      const currentPage = index + 1;
      const component = TEMPLATES.tagPostsPage;
      const context = {
        tag,
        tagRegex: `/${tag}/i`,
        limit: POSTS_PER_PAGE,
        skip: index * POSTS_PER_PAGE,
        currentPage,
        pagesCount: tagPagesCount,
        convertkitEndpoint: process.env.CONVERTKIT_ENDPOINT,
      };

      if (isFirstPage) {
        createPage({
          path: `${PAGES_ROUTES.tags.index}/${tag}`,
          component,
          context,
        });
        return;
      }

      createPage({
        path: `${PAGES_ROUTES.tags.index}/${tag}/page/${currentPage}`,
        component,
        context,
      });
    });
  });

  // ------------ CREATING BLOG PAGINATION ------------

  const blogPagesCount = Math.ceil(blogPosts.length / POSTS_PER_PAGE);

  Array.from({ length: blogPagesCount }).forEach((_, index) => {
    createPaginationPage(
      createPage,
      blogPagesCount,
      PAGES_ROUTES.blog.pagination,
      index,
      TEMPLATES.blogPostsPage
    );
  });

  // ------------ CREATING FEED PAGINATION ------------

  const feedPagesCount = Math.ceil(allPosts.length / POSTS_PER_PAGE);

  Array.from({ length: feedPagesCount }).forEach((_, index) => {
    createPaginationPage(
      createPage,
      feedPagesCount,
      PAGES_ROUTES.feed.pagination,
      index,
      TEMPLATES.feedPostsPage
    );
  });

  // ------------ NOTES INDEX PAGE ------------
  createPage({
    path: PAGES_ROUTES.notes.index,
    component: TEMPLATES.notesPage,
  });

  // ------------ CREATING NOTES ------------
  const notesResult = await graphql(`
    {
      allFile(
        filter: {
          absolutePath: { regex: "/content/" }
          childMdx: {
            frontmatter: { public: { in: true }, type: { in: [null, "note"] } }
          }
        }
      ) {
        edges {
          node {
            childMdx {
              slug
              frontmatter {
                title
              }
            }
          }
        }
      }
    }
  `);

  notesResult.data.allFile.edges.forEach(({ node }) => {
    if (!node.childMdx) {
      return;
    }

    const slug = node.childMdx.slug;

    createPage({
      path: `${PAGES_ROUTES.notes.index}/${slug}`,
      component: TEMPLATES.notePage,
      context: {
        slug,
        title: node.childMdx.frontmatter.title,
        convertkitEndpoint: process.env.CONVERTKIT_ENDPOINT,
      },
    });
  });
};

const onCreatePage = ({ page, actions }) => {
  const { createPage } = actions

  createPage({
    ...page,
    context: {
      ...page.context,
      convertkitEndpoint: process.env.CONVERTKIT_ENDPOINT,
    },
  });
}

module.exports = {
  onPreBootstrap,
  createPages,
  onCreatePage,
};
