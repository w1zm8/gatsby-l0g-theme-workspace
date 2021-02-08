module.exports = {
  siteMetadata: {
    logoTitle: "craeft_",
    title: "craeft.dev 🦉",
    titleTemplate: "%s | craeft.dev 🦉",
    description:
      "Elit dolore enim exercitation aliquip commodo ex sit do aliquip incididunt adipisicing velit amet.",
    url: "https://localhost:8000",
    image: "",
    twitterUsername: "@w1zm8",
    substackLink: "https://craeft.substack.com",
    nav: [
      { path: "/", name: "Home" },
      { path: "/blog", name: "Blog" },
      { path: "/about", name: "About" },
      { path: "/contact", name: "Contact" },
    ],
    copyright: "© craeft.dev 2020",
    footerNav: [
      { path: "/blog", name: "Blog" },
      { path: "https://w1zm8.substack.com", name: "Newsletter" },
      { path: "/rss", name: "RSS" },
      { path: "https://twitter.com/w1zm8", name: "Twitter" },
      { path: "https://github.com/w1zm8", name: "GitHub" },
    ],
    avatarSrc: "./static/images/avatar.jpg",
  },
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `craeft.dev blog`,
        short_name: `craeft.dev`,
        start_url: `/`,
        icon: "./static/images/favicon.png",
        display: `standalone`,
      },
    },
    "gatsby-plugin-ts-config",
    "gatsby-craeft-dev-theme",
  ],
};
