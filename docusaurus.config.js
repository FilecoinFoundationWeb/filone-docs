// @ts-check
import { themes as prismThemes } from "prism-react-renderer";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Fil One",
  tagline: "S3 object storage built for the AI era.",
  favicon: "img/favicon.svg",
  url: "https://fil.one",
  baseUrl: "/",
  organizationName: "FilecoinFoundationWeb",
  projectName: "filone-docs",

  onBrokenLinks: "throw",

  headTags: [
    {
      tagName: "script",
      attributes: { type: "application/ld+json" },
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Fil One",
        "description": "S3 object storage built for the AI era. S3-compatible, backed by Filecoin for cryptographically verifiable data integrity. No egress fees, $4.99/TB/month flat rate.",
        "url": "https://fil.one",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "UnitPriceSpecification",
          "price": "4.99",
          "priceCurrency": "USD",
          "unitText": "TB/month"
        },
        "featureList": [
          "S3-compatible API",
          "No egress fees",
          "AES-256 encryption at rest",
          "Filecoin-backed verifiable data integrity",
          "Path-style addressing",
          "AWS SigV4 authentication",
          "30-day free trial"
        ],
        "provider": {
          "@type": "Organization",
          "name": "Filecoin Foundation",
          "url": "https://fil.org"
        }
      }),
    },
  ],

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
