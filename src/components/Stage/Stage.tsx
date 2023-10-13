import { Step, Stage } from "shared/interfaces";
import cls from "./Stage.module.css";

interface StageProps {
    title: string;
    steps: Step[];
    onStepToggle: React.Dispatch<React.SetStateAction<Stage[]>>;
    stageIndex: number;
    prevStageCompleted: boolean;
    stageCompleted: boolean;
}

export const StageComponent: React.FC<StageProps> = (props) => {
    const {
        title,
        steps,
        onStepToggle,
        stageIndex,
        prevStageCompleted,
        stageCompleted,
    } = props;

    const toggleStep = (stepIndex: number) => {
        onStepToggle((prev: Stage[]) => {
            const updatedStages = [...prev];

            //toggle checkbox
            updatedStages[stageIndex] = {
                ...updatedStages[stageIndex],
                steps: [...updatedStages[stageIndex].steps],
            };
            updatedStages[stageIndex].steps[stepIndex] = {
                ...updatedStages[stageIndex].steps[stepIndex],
                stepCompleted:
                    !updatedStages[stageIndex].steps[stepIndex].stepCompleted,
            };

            //uncheck checkboxes in the next stages if current checkbox is false
            if (!updatedStages[stageIndex].steps[stepIndex].stepCompleted) {
                updatedStages.slice(stageIndex + 1).forEach((stage) => {
                    stage.stageCompleted = false;
                    stage.steps.forEach((step) => (step.stepCompleted = false));
                });
            }

            //check if stage is completed
            const isStageCompleted = updatedStages[stageIndex].steps.every(
                (step: Step) => step.stepCompleted
            );
            updatedStages[stageIndex].stageCompleted = isStageCompleted;

            return updatedStages;
        });
    };

    return (
        <div>
            <div className={cls.stageTitle}>
                <div className={cls.stageIndex}>{stageIndex + 1}</div>
                <h2>{title}</h2>
                <div>{stageCompleted && "done"}</div>
            </div>

            {steps.map(({ id, stepCompleted, description }) => (
                <div key={id}>
                    <input
                        type="checkbox"
                        checked={stepCompleted}
                        disabled={!prevStageCompleted && stageIndex > 0}
                        onChange={() => toggleStep(id)}
                    />
                    <span>{description}</span>
                </div>
            ))}
        </div>
    );
};
