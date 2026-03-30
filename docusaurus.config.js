// @ts-check
import { themes as prismThemes } from "prism-react-renderer";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Fil One",
  tagline: "S3-compatible object storage with built-in compliance and immutability.",
  favicon: "img/favicon.svg",
  url: "https://fil.one",
  baseUrl: "/",
  organizationName: "filecoin-one",
  projectName: "docs",

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
          editUrl: "https://github.com/filecoin-one/docs/tree/main/",
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
        title: "Fil One",
        logo: {
          alt: "Fil One",
          src: "img/logo.svg",
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "docs",
            position: "left",
            label: "Docs",
          },
          {
            to: "/reference/s3-compatibility",
            label: "API Reference",
            position: "left",
          },
          {
            to: "/sdk/overview",
            label: "SDKs",
            position: "left",
          },
          {
            href: "https://app.fil.one",
            label: "Dashboard",
            position: "right",
          },
          {
            href: "https://status.fil.one",
            label: "Status",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              { label: "Quickstart", to: "/quickstart" },
              { label: "S3 Compatibility", to: "/reference/s3-compatibility" },
              { label: "Object Lock", to: "/storage/object-lock" },
            ],
          },
          {
            title: "Resources",
            items: [
              { label: "FAQ", to: "/faq" },
              { label: "Status", href: "https://status.fil.one" },
              { label: "Support", href: "mailto:support@fil.one" },
            ],
          },
          {
            title: "More",
            items: [
              { label: "GitHub", href: "https://github.com/filecoin-one" },
              { label: "X / Twitter", href: "https://x.com/filaboratory" },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Filecoin One.`,
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
