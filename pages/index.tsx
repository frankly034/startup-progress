import Head from "next/head";
import { useEffect, useMemo, useState } from "react";
import { Stage } from "../components";
import db, { Answer, Fact, ProjectStage } from "../db";

export default function Home() {
  const [stages, setStages] = useState<ProjectStage[]>([]);
  const [answers, setAnswers] = useState<Answer>({});
  const [fact, setFact] = useState<string>();

  const setupComplete = useMemo(() => {
    if (answers) {
      return db.progressCompleted();
    }
  }, [answers]);

  console.log({ setupComplete });

  const fetchRandomFact = async () => {
    const response = await fetch("https://uselessfacts.jsph.pl/random.json");
    const fact: Fact = await response.json();
    setFact(fact.text);
  };

  useEffect(() => {
    db.init();
    setStages(db.getStartupStages());
    setAnswers(db.getStartupProgressAnswers());
  }, []);

  useEffect(() => {
    if (setupComplete) {
      fetchRandomFact();
      return;
    }
    setFact("");
  }, [setupComplete]);

  const handleOnChange = (id: number) => {
    db.updateStartupProgressAnswer(id);
    setAnswers(db.getStartupProgressAnswers());
  };

  const handleUndo = (level: number) => {
    db.reopenLevel(level);
  };

  return (
    <div className="container">
      <Head>
        <title>My startup progress</title>
        <meta
          name="description"
          content="Simple app to track progress for startups"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">My startup progress</h1>
        <div className="stage-container">
          {stages?.map((stage, index) => {
            const level = stage.level;
            const isDone = db.preceedingLevelCompleted(level);
            return (
              <Stage
                answers={answers}
                isDone={isDone}
                key={index}
                onChange={handleOnChange}
                onUndo={handleUndo}
                projectStage={stage}
              />
            );
          })}
        </div>
        {fact && (
          <div className="facts">
            <h2>Random Facts</h2>
            <p>{fact}</p>
          </div>
        )}
      </main>
    </div>
  );
}
