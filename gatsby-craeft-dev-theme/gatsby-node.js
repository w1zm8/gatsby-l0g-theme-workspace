const fs = require("fs");
const {
  CONTENT_PATHS,
  CONTENT_REQUIRED_FILES,
  TEMPLATES,
  PAGES_ROUTES,
  POSTS_PER_PAGE,
} = require("./options");

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
    .slice(0, 3);

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
      }) => tags
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
  createNonExistentFolder(CONTENT_PATHS.posts, reporter);
};

const createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const result = await graphql(`
    query {
      allMdx(
        filter: {
          fileAbsolutePath: { regex: "/src/content/blog/" }
          frontmatter: { hidden: { ne: true } }
        }
        sort: { fields: frontmatter___date, order: ASC }
      ) {
        edges {
          node {
            id
            frontmatter {
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

  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query');
  }

  const posts = result.data.allMdx.edges;

  // ------------ CREATING PAGES FOR EACH PUBLIC POST ------------

  posts.forEach((currentPost, index) => {
    const relatedPostsIds = getRelatedPostsIds(currentPost, posts);
    const prevPost = index === 0 ? null : posts[index - 1];
    const nextPost = index === posts.length - 1 ? null : posts[index + 1];

    createPage({
      path: `${PAGES_ROUTES.blog.post}/${currentPost.node.frontmatter.slug}`,
      component: TEMPLATES.postPage,
      context: {
        id: currentPost.node.id,
        relatedPostsIds,
        nextPost,
        prevPost,
      },
    });
  });

  // ------------ CREATING PAGE FOR ALL TAGS ------------

  const allTags = getTagsFromPosts(posts);
  const tagPostsCount = getTagsCount(allTags);
  const tags = Array.from(new Set(allTags).values());

  createPage({
    path: PAGES_ROUTES.blog.tags,
    component: TEMPLATES.tagsPage,
    context: {
      tags,
      tagPostsCount,
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
        limit: POSTS_PER_PAGE,
        skip: index * POSTS_PER_PAGE,
        currentPage,
        pagesCount: tagPagesCount,
      };

      if (isFirstPage) {
        createPage({
          path: `${PAGES_ROUTES.blog.tags}/${tag}`,
          component,
          context,
        });
        return;
      }

      createPage({
        path: `${PAGES_ROUTES.blog.tags}/${tag}/page/${currentPage}`,
        component,
        context,
      });
    });
  });

  // ------------ CREATING PAGINATION ------------

  const pagesCount = Math.ceil(posts.length / POSTS_PER_PAGE);

  Array.from({ length: pagesCount }).forEach((_, index) => {
    const isFirstPage = index === 0;
    const currentPage = index + 1;

    if (isFirstPage) {
      return;
    }

    createPage({
      path: `${PAGES_ROUTES.blog.pagination}/${currentPage}`,
      component: TEMPLATES.postsPage,
      context: {
        limit: POSTS_PER_PAGE,
        skip: index * POSTS_PER_PAGE,
        currentPage,
        pagesCount,
      },
    });
  });
};

module.exports = {
  onPreBootstrap,
  createPages,
};
