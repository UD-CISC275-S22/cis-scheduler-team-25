import React from "react";
import { DegreePlan } from "../interfaces/degreeplan";
import { MainView } from "./MainView";
import { PlanView } from "./PlanView";
import { SemesterView } from "./SemesterView";

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
    // Wouldn't it be nice if the linter let me use switches? Alas
    if (mode === "plan") {
        return <PlanView currentPlan={currentPlan} setMode={setMode} />;
    } else if (mode === "semester") {
        return <SemesterView setMode={setMode} />;
    }
    return (
        <MainView
            setMode={setMode}
            plans={plans}
            currentPlan={currentPlan}
            setCurrentPlan={setCurrentPlan}
        />
    );
}
