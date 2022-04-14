import React from "react";
import { DegreePlan } from "../interfaces/degreeplan";
import { Semester } from "../interfaces/semester";
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
    setCurrentPlan,
    currentSemester,
    setCurrentSemester,
    setPlans
}: {
    mode: string;
    setMode: (newMode: string) => void;
    plans: DegreePlan[];
    currentPlan: DegreePlan;
    setCurrentPlan: (newPlan: DegreePlan) => void;
    currentSemester: Semester;
    setCurrentSemester: (newSemester: Semester) => void;
    setPlans: (newPlans: DegreePlan[]) => void;
}): JSX.Element {
    switch (mode) {
        case "plan":
            return (
                <PlanView
                    currentPlan={currentPlan}
                    setCurrentPlan={setCurrentPlan}
                    setCurrentSemester={setCurrentSemester}
                    setMode={setMode}
                    setPlans={setPlans}
                    plans={plans}
                />
            );
        case "semester":
            return (
                <SemesterView
                    setMode={setMode}
                    setCurrentSemester={setCurrentSemester}
                    currentSemester={currentSemester}
                    setCurrentPlan={setCurrentPlan}
                    currentPlan={currentPlan}
                />
            );
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
