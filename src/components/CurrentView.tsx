import React from "react";
import { DegreePlan } from "../interfaces/degreeplan";
import { MainView } from "./MainView";
import { PlanView } from "./PlanView";
import { SemesterView } from "./SemesterView";

/*
View helper for handling switching between the main menu, the planner for a
specific degree plan, and the view for editing a specific semester within a plan
*/
export function CurrentView({
    mode,
    setMode,
    plans,
    currentPlan,
    setCurrentPlan
}: {
    mode: string;
    setMode: (newMode: string) => void;
    plans: DegreePlan[];
    currentPlan: DegreePlan;
    setCurrentPlan: (newPlan: DegreePlan) => void;
}): JSX.Element {
    switch (mode) {
        case "plan":
            return <PlanView currentPlan={currentPlan} setMode={setMode} />;
        case "semester":
            return <SemesterView setMode={setMode} />;
        default:
            return (
                <MainView
                    setMode={setMode}
                    plans={plans}
                    currentPlan={currentPlan}
                    setCurrentPlan={setCurrentPlan}
                />
            );
    }
}
