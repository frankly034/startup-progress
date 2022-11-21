import { FunctionComponent } from "react";
import { CheckBox, StageTitle } from "..";
import { Answer, ProjectStage } from "../../db";

type StageProps = {
  answers: Answer;
  isDone: boolean;
  onChange: (id: number) => void;
  onUndo: (level: number) => void;
  projectStage: ProjectStage;
};

const Stage: FunctionComponent<StageProps> = ({
  answers,
  isDone,
  onChange,
  onUndo,
  projectStage: { level, steps, title },
}) => {
  const handleUndo = () => onUndo(level);
  return (
    <div className="stage">
      <StageTitle isDone={isDone} level={level} title={title} />
      {steps.map(({ id, title }) => {
        return (
          <CheckBox
            key={id}
            checked={answers[id] === true}
            id={id}
            label={title}
            onChange={onChange}
          />
        );
      })}
      {isDone && <button onClick={handleUndo}>Reopen</button>}
    </div>
  );
};

export default Stage;
