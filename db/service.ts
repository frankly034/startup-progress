import { stages } from "./fixtures";
import { Answer, Progress, ProjectStage } from "./models";

const PROGRESS = "progress";
const PROGRESS_ANSWERS = "answers";

const init = () => {
  if (!getStartupProgressAnswers()) {
    setData(PROGRESS_ANSWERS, {});
    setData(PROGRESS, { currentLevel: 1, activatedLevels: [1] });
  }
};

const getData = (key: string) => {
  if (typeof window !== "undefined") {
    const stringData = localStorage.getItem(key);
    return stringData ? JSON.parse(stringData) : undefined;
  }
};

const setData = (key: string, value: Record<string, any>) => {
  if (typeof window !== "undefined") {
    const valueString = JSON.stringify(value);
    localStorage.setItem(key, valueString);
  }
};

const getStartupProgress = (): Progress => {
  return getData(PROGRESS);
};

const getStartupProgressAnswers = (): Answer => {
  return getData(PROGRESS_ANSWERS);
};

const getStartupStages = (): ProjectStage[] => {
  return stages;
};

const getStepsPreceedingSteps = (maxLevel: number) => {
  return stages
    .filter(({ level }) => level <= maxLevel)
    .flatMap(({ steps }) => steps);
};

const preceedingLevelCompleted = (level: number) => {
  const activatedSteps = getStepsPreceedingSteps(level);
  const answers = getStartupProgressAnswers();
  return answers && activatedSteps.every(({ id }) => answers[id] === true);
};

const getActiveSteps = () => {
  const { activatedLevels } = getStartupProgress();
  return stages
    .filter(({ level }) => activatedLevels.includes(level))
    .flatMap(({ steps }) => steps);
};

const getStepLevel = (id: number) => {
  return stages.reduce((acc, cur) => {
    if (cur.steps.find((step) => step.id === id)) {
      return cur.level;
    }

    return acc;
  }, -1);
};

const updateStartupProgressAnswer = (id: number) => {
  const { currentLevel } = getStartupProgress();
  const activeSteps = getActiveSteps();
  const questionInActiveSteps = activeSteps.find((step) => step.id === id);

  if (!questionInActiveSteps) {
    return;
  }

  const answers = getStartupProgressAnswers();

  const updatedAnswers = {
    ...answers,
    [id]: !answers[id],
  };

  setData(PROGRESS_ANSWERS, updatedAnswers);

  if (preceedingLevelCompleted(currentLevel)) {
    updateActiveLevels(id);
    updateStartupProgress();
    return;
  }
};

const updateActiveLevels = (stepId: number) => {
  const questionLevel = getStepLevel(stepId);
  const { currentLevel, activatedLevels } = getStartupProgress();

  const newActiveLevels = activatedLevels.filter(
    (level) => level !== questionLevel
  );

  setData(PROGRESS, {
    currentLevel,
    activatedLevels: newActiveLevels,
  });
};

const updateStartupProgress = () => {
  const { currentLevel } = getStartupProgress();
  stages.sort((a, b) => a.level - b.level);

  const currentStageIndex = stages.findIndex(
    (stage) => stage.level === currentLevel
  );

  if (currentStageIndex + 1 < stages.length) {
    const { level: nextLevel } = stages[currentStageIndex + 1];
    setData(PROGRESS, {
      currentLevel: nextLevel,
      activatedLevels: [nextLevel],
    });
  }
};

const reopenLevel = (level: number) => {
  const progress = getStartupProgress();
  setData(PROGRESS, {
    ...progress,
    activatedLevels: [...progress.activatedLevels, level],
  });
};

const progressCompleted = () => {
  const finalLevel = stages[stages.length - 1].level;
  return preceedingLevelCompleted(finalLevel);
};

const db = {
  init,
  getStartupProgressAnswers,
  getStartupStages,
  preceedingLevelCompleted,
  progressCompleted,
  reopenLevel,
  updateStartupProgressAnswer,
};

export default db;
