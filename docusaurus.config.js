// @ts-check
import { themes as prismThemes } from "prism-react-renderer";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Fil One",
  tagline: "S3-compatible object storage with built-in compliance and immutability.",
  favicon: "img/favicon.svg",
  url: "https://fil.one",
  baseUrl: "/",
  organizationName: "FilecoinFoundationWeb",
  projectName: "filone-docs",

  onBrokenLinks: "throw",

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: "warn",
    },
  },

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: "/",
          sidebarPath: "./sidebars.js",
          editUrl: "https://github.com/FilecoinFoundationWeb/filone-docs/tree/main/",
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: "light",
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: "",
        logo: {
          alt: "Fil One",
          src: "img/logo.svg",
          srcDark: "img/logo-white.svg",
        },
        items: [
          {
            to: "/",
            label: "Documentation",
            position: "left",
            activeBaseRegex: "^/(?!(reference|sdk))",
          },
          {
            to: "/reference/overview",
            label: "API Reference",
            position: "left",
          },
          {
            to: "/sdk/overview",
            label: "SDKs",
            position: "left",
          },
          {
            type: "html",
            position: "right",
            value: '<a href="https://app.fil.one/login" class="navbar-btn-secondary">Login</a>',
          },
          {
            type: "html",
            position: "right",
            value: '<a href="https://app.fil.one/login?screen_hint=signup" class="navbar-btn-primary"><span class="navbar-btn-primary-inner">Sign up</span></a>',
          },
        ],
      },

      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ["bash", "json", "python", "go", "ini"],
      },
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 4,
      },
    }),
};

export default config;
