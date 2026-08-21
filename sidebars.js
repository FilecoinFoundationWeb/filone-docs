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
        "integrations/validate-an-integration",
        {
          type: "category",
          label: "Data movement",
          items: [
            "integrations/data-movement/rclone",
            "integrations/data-movement/cyberduck-mountain-duck",
            "integrations/data-movement/aws-cli-sdk",
          ],
        },
        {
          type: "category",
          label: "Backup and disaster recovery",
          items: [
            "integrations/backup/acronis-cyber-protect",
            "integrations/backup/comet-backup",
            "integrations/backup/msp360",
            "integrations/backup/nakivo",
          ],
        },
        {
          type: "category",
          label: "NAS and file services",
          items: [
            "integrations/nas/synology-cloud-sync",
            "integrations/nas/qnap-hbs",
            "integrations/nas/truenas-cloud-sync",
          ],
        },
        {
          type: "category",
          label: "Kubernetes and DevOps",
          items: [
            "integrations/devops/velero",
            "integrations/devops/harbor",
            "integrations/devops/terraform",
          ],
        },
        {
          type: "category",
          label: "SIEM and logging",
          items: [
            "integrations/logging/elasticsearch-snapshots",
            "integrations/logging/splunk-smartstore",
          ],
        },
        {
          type: "category",
          label: "Data and AI",
          items: [
            "integrations/data-ai/apache-iceberg",
            "integrations/data-ai/databricks",
            "integrations/data-ai/delta-lake",
            "integrations/data-ai/duckdb",
            "integrations/data-ai/hugging-face-datasets",
            "integrations/data-ai/ray-data",
          ],
        },
      ],
    },
    "faq",
    "limits",
  ],
};

export default sidebars;
