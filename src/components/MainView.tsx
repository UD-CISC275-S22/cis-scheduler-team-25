import React from "react";
import { Button } from "react-bootstrap";
import { DegreePlan } from "../interfaces/degreeplan";
import { DegreePlanList } from "./DegreePlanList";
import { CSVExport } from "./CSVExport";
import invalidSemester from "../exampleData/invalid_semester.json";
import { Semester } from "../interfaces/semester";

// button for switching to the PlanView
function PlanViewButton({
    setMode,
    setCurrentSemester
}: {
    setMode: (newMode: string) => void;
    setCurrentSemester: (newSemester: Semester) => void;
}): JSX.Element {
    return (
        <Button
            data-testid="main-plan-button"
            onClick={() => {
                setCurrentSemester(invalidSemester);
                setMode("plan");
            }}
        >
            View Degree Plan
        </Button>
    );
}

/*
View for the main menu, showing a list of degree plans you can select OR choose
to make a new one
*/
export function MainView({
    setMode,
    plans,
    currentPlan,
    setCurrentPlan,
    setCurrentSemester,
    setPlans
}: {
    setPlans: (newPlans: DegreePlan[]) => void;
    setMode: (newMode: string) => void;
    plans: DegreePlan[];
    currentPlan: DegreePlan;
    setCurrentPlan: (newPlan: DegreePlan) => void;
    setCurrentSemester: (newSemester: Semester) => void;
}): JSX.Element {
    return (
        <div>
            <h1>Degree Plan Selector</h1>
            <DegreePlanList
                setPlans={setPlans}
                plans={plans}
                currentPlan={currentPlan}
                setCurrentPlan={setCurrentPlan}
            />
            <PlanViewButton
                setMode={setMode}
                setCurrentSemester={setCurrentSemester}
            />
            <CSVExport plans={plans} />
        </div>
    );
}
