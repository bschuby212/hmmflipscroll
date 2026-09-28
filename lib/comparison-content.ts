export type ComparisonSide = {
  label: string;
  heading: string;
  description: string;
  image: string;
};

export const comparisonContent = {
  before: {
    label: "Before",
    heading: "The original mobile experience",
    description:
      "The original design made important actions difficult to find and created unnecessary friction throughout the experience.",
    image: "/images/before.svg",
  },
  after: {
    label: "After",
    heading: "A clearer, more focused experience",
    description:
      "The redesigned experience simplifies navigation, improves visual hierarchy, and makes important actions easier to complete.",
    image: "/images/after.svg",
  },
} satisfies Record<"before" | "after", ComparisonSide>;
