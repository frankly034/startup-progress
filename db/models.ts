export type Step = {
  id: number;
  position: number;
  title: string;
};

export type ProjectStage = {
  level: number;
  status?: "active" | "completed" | "pending";
  steps: Step[];
  title: string;
};

export type Progress = {
  activatedLevels: number[];
  currentLevel: number;
};

export type Answer = Record<number, boolean>;

export type Fact = {
  id: string;
  text: string;
};
