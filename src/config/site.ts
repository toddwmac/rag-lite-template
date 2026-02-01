export const siteConfig = {
  name: "SmartDocs",
  subtitle: "Live Tuning",
  company: {
    name: "Applied AI Labs",
    url: "https://www.CenterForAppliedai.com",
    logo: "https://centerforappliedai.com/wp-content/uploads/2025/03/8e2adab0e3f168217b0338d68bba5992.png",
  },
  ai: {
    defaultModel: "claude-3-haiku-20240307",
    defaultPersona: "Never output raw JSON. Use professional corporate tone. Cite sources where possible.",
  },
  theme: {
    primary: "#2872fa",
    secondary: "#192a3d",
  },
};

export type SiteConfig = typeof siteConfig;
