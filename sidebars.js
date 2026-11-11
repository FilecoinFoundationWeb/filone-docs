/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    "introduction",
    {
      type: "category",
      label: "Getting Started",
      collapsed: false,
      items: [
        "quickstart/index",
        "quickstart/cli",
        "quickstart/sdk",
      ],
    },
    {
      type: "category",
      label: "Guides",
      link: {
        type: "generated-index",
        title: "Guides",
        description: "Task guides for moving data to Fil One and choosing where it lives.",
        slug: "/guides",
      },
      items: [
        "guides/migration",
        "guides/choosing-a-region",
      ],
    },
    {
      type: "category",
      label: "Storage",
      link: {
        type: "generated-index",
        title: "Storage",
        description: "Buckets, objects, multipart uploads, versioning and Object Lock.",
        slug: "/storage",
      },
      items: [
        "storage/buckets",
        "storage/objects",
        "storage/multipart-uploads",
        "storage/versioning",
        "storage/object-lock",
      ],
    },
    {
      type: "category",
      label: "Security",
      items: [
        "security/account-security",
        "security/authentication",
        "security/api-keys",
        "security/encryption",
      ],
    },
    {
      type: "category",
      label: "Billing",
      items: [
        "billing/trial",
        "billing/pricing",
        "billing/usage",
      ],
    },
    {
      type: "category",
      label: "Console",
      items: [
        { type: "doc", id: "app/dashboard", label: "Dashboard" },
        { type: "doc", id: "app/buckets", label: "Buckets" },
        { type: "doc", id: "app/api-keys", label: "API Keys" },
        "app/ai-agent-toolkit",
        { type: "doc", id: "app/organization", label: "Organization" },
        { type: "doc", id: "app/billing", label: "Billing" },
        { type: "doc", id: "app/settings", label: "Settings" },
        { type: "doc", id: "app/support", label: "Support" },
      ],
    },
    {
      type: "category",
      label: "API Reference",
      items: [
        "reference/overview",
        "reference/s3-compatibility",
        "reference/errors",
        "limits",
        "reference/glossary",
      ],
    },
    {
      type: "category",
      label: "SDKs & Tools",
      items: [
        "sdk/overview",
        "sdk/python",
        "sdk/javascript",
        "sdk/go",
        "sdk/cli",
      ],
    },
    {
      type: "category",
      label: "Help",
      items: [
        "faq",
        { type: "link", label: "Troubleshooting", href: "/reference/errors#troubleshooting" },
        { type: "link", label: "Contact support", href: "/app/support" },
        { type: "link", label: "Service status", href: "https://status.filone.com" },
      ],
    },
  ],
};

export default sidebars;
