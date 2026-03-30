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
      label: "Storage",
      items: [
        "storage/buckets",
        "storage/objects",
        "storage/object-lock",
        "storage/multipart-uploads",
      ],
    },
    {
      type: "category",
      label: "Security",
      items: [
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
      label: "App",
      items: [
        "app/overview",
        "app/managing-buckets",
        "app/uploading-files",
      ],
    },
    {
      type: "category",
      label: "API Reference",
      items: [
        "reference/overview",
        "reference/s3-compatibility",
        "reference/errors",
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
    "faq",
    "limits",
  ],
};

export default sidebars;
