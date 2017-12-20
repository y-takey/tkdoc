/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* List of projects/orgs using your project for the users page */
const users = [
  {
    caption: "User1",
    image: "/tkdoc/img/docusaurus.svg",
    infoLink: "https://www.facebook.com",
    pinned: true
  }
];

const siteConfig = {
  title: "Docusaurus trial" /* title for your website */,
  tagline: "A website for testing",
  url: "https://github.com/y-takey/tkdoc" /* your website url */,
  baseUrl: "/tkdoc/" /* base url for your project */,
  projectName: "tkdoc",
  headerLinks: [
    { doc: "doc1", label: "Docs" },
    { doc: "doc4", label: "API" },
    { languages: true },
    { page: "versions", label: "Version" },
    { page: "help", label: "Help" },
    { blog: true, label: "Blog" }
  ],
  users,
  /* path to images for header/footer */
  headerIcon: "img/docusaurus.svg",
  footerIcon: "img/docusaurus.svg",
  favicon: "img/favicon.png",
  /* colors for website */
  colors: {
    primaryColor: "#42A5F5",
    secondaryColor: "#FFCE37"
  },
  // This copyright info is used in /core/Footer.js and blog rss/atom feeds.
  copyright: "Copyright © " + new Date().getFullYear() + " y-takey",
  organizationName: "y-takey", // or set an env variable ORGANIZATION_NAME
  // projectName: 'test-site', // or set an env variable PROJECT_NAME
  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks
    theme: "default"
  },
  scripts: ["https://buttons.github.io/buttons.js"],
  // You may provide arbitrary config keys to be used as needed by your template.
  repoUrl: "https://github.com/y-takey/tkdoc"
};

module.exports = siteConfig;
