import { FunctionComponent } from "react";
import Image from "next/image";

export type StageTitleProps = {
  level: number;
  title: string;
  isDone: boolean;
};

const StageTitle: FunctionComponent<StageTitleProps> = ({
  level,
  title,
  isDone,
}) => {
  return (
    <div className="stage-title">
      <h2>
        <span className="level">{level}</span>
        {title}
      </h2>
      {isDone && <Image src="/done.svg" alt="done" width="32" height="32" />}
    </div>
  );
};

export default StageTitle;
