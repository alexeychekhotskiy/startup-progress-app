import { useEffect, useState } from "react";
import { StageComponent } from "components/Stage/Stage";
import "./App.css";
import { Stage } from "shared/interfaces";
import { data } from "shared/data";
import { fetchRandomFact } from "api/randomApi";
import { DATA_KEY } from "shared/constants";

function App() {
    const storedData = localStorage.getItem(DATA_KEY);

    const [stages, setStages] = useState(
        (storedData && (JSON.parse(storedData) as Stage[])) || data
    );
    const [allStagesCompleted, setAllStagesCompleted] = useState(false);
    const [randomFact, setRandomFact] = useState<string | null>(null);

    const areAllStagesDone = stages.every(
        (stage: Stage) => stage.stageCompleted
    );

    useEffect(() => {
        localStorage.setItem(DATA_KEY, JSON.stringify(stages));
    }, [stages]);

    const getRandomFact = async () => {
        const randomFact = await fetchRandomFact();
        if (randomFact) {
            setRandomFact(randomFact);
        }
    };

    useEffect(() => {
        setAllStagesCompleted(areAllStagesDone);
        if (areAllStagesDone) {
            getRandomFact();
        } else {
            setRandomFact(null);
        }
    }, [stages, setAllStagesCompleted, areAllStagesDone]);

    return (
        <>
            <h1>My startup progress</h1>
            {stages.map((stage: Stage) => {
                return (
                    <StageComponent
                        key={stage.id}
                        stageIndex={stage.id}
                        onStepToggle={setStages}
                        prevStageCompleted={
                            stages[stage.id - 1]?.stageCompleted
                        }
                        {...stage}
                    />
                );
            })}
            {allStagesCompleted && <div>{randomFact}</div>}
        </>
    );
}

export default App;
