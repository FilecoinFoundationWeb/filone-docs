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
        "storage/multipart-uploads",
        "storage/versioning",
        "storage/object-lock",
      ],
    },
    "bucket-intelligence",
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
      label: "App",
      items: [
        "app/dashboard",
        "app/buckets",
        "app/api-keys",
        "app/bucket-intelligence",
        "app/ai-agent-toolkit",
        "app/billing",
        "app/settings",
        "app/support",
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
    {
      type: "category",
      label: "Integrations",
      items: [
        "integrations/index",
        "integrations/connection-settings",
        {
          type: "category",
          label: "Data movement",
          items: [
            "integrations/data-movement/rclone",
            "integrations/data-movement/cyberduck-mountain-duck",
            "integrations/data-movement/aws-cli-sdk",
          ],
        },
      ],
    },
    "faq",
    "limits",
  ],
};

export default sidebars;
