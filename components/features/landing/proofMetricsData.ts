export interface ProofMetric {
  value: number;
  suffix: string;
  label: string;
  shortLabel: string;
  detail: string;
}

export const proofMetrics: ProofMetric[] = [
  {
    value: 11,
    suffix: "+",
    label: "Products Shipped",
    shortLabel: "Products",
    detail: "Landing pages, dashboards, marketplaces, MVPs",
  },
  {
    value: 3,
    suffix: "y+",
    label: "Frontend Ownership",
    shortLabel: "Ownership",
    detail: "React, Next.js, TypeScript, Tailwind, Motion",
  },
  {
    value: 15,
    suffix: "+",
    label: "Clients Served",
    shortLabel: "Clients",
    detail: "Founders, agencies, startups, businesses",
  },
  {
    value: 100,
    suffix: "%",
    label: "Delivery Rate",
    shortLabel: "Delivery",
    detail: "Clear execution, ownership, and post-launch support",
  },
];
