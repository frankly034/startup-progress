import { ProjectStage } from "./models";

export const stages: ProjectStage[] = [
  {
    level: 1,
    steps: [
      {
        id: 1,
        position: 1,
        title: "Setup virtual office",
      },
      {
        id: 2,
        position: 2,
        title: "Set mission & vision",
      },
      {
        id: 3,
        position: 3,
        title: "Select business name",
      },
      {
        id: 4,
        position: 4,
        title: "Buy domains",
      },
    ],
    title: "Foundation",
  },
  {
    level: 2,
    steps: [
      {
        id: 5,
        position: 1,
        title: "Create roadmap",
      },
      {
        id: 6,
        position: 2,
        title: "Competitor analysis",
      },
    ],
    title: "Discovery",
  },
  {
    level: 3,
    steps: [
      {
        id: 7,
        position: 1,
        title: "Release marketing website",
      },
      {
        id: 8,
        position: 2,
        title: "Release MVP",
      },
    ],
    title: "Delivery",
  },
];
