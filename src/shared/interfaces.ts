export interface Step {
    id: number;
    stepCompleted: boolean;
    description: string;
}
export interface Stage {
    id: number;
    stageCompleted: boolean;
    steps: Step[];
    title: string;
}
