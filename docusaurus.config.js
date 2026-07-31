// @ts-check
import { themes as prismThemes } from "prism-react-renderer";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Fil One",
  tagline: "S3 object storage built for the AI era.",
  favicon: "img/favicon.svg",
  url: "https://docs.fil.one",
  baseUrl: "/",
  organizationName: "FilecoinFoundationWeb",
  projectName: "filone-docs",

  onBrokenLinks: "throw",

  headTags: [
    {
      tagName: "script",
      attributes: {},
      innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PK26TC8W');`,
    },
    {
      tagName: "script",
      attributes: { type: "application/ld+json" },
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Fil One",
        "description": "S3-compatible object storage backed by Filecoin. No egress fees on paid plans, $4.99/TB/month. Works with the S3 SDKs and tools you already use.",
        "url": "https://docs.fil.one",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "UnitPriceSpecification",
          "price": "4.99",
          "priceCurrency": "USD"
        },
        "featureList": [
          "S3-compatible API",
          "No egress fees on paid plans",
          "Encryption at rest",
          "Object Lock (WORM) retention",
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
            label: "SDKs & Tools",
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
