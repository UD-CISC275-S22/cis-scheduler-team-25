import React from "react";
import { Button } from "react-bootstrap";
import { DegreePlan } from "../interfaces/degreeplan";
import { DegreePlanList } from "./DegreePlanList";
import { CSVExport } from "./CSVExport";

// button for switching to the PlanView
function PlanViewButton({
    setMode
}: {
    setMode: (newMode: string) => void;
}): JSX.Element {
    return (
        <Button data-testid="main-plan-button" onClick={() => setMode("plan")}>
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
    setCurrentPlan
}: {
    setMode: (newMode: string) => void;
    plans: DegreePlan[];
    currentPlan: DegreePlan;
    setCurrentPlan: (newPlan: DegreePlan) => void;
}): JSX.Element {
    return (
        <div>
            <h1>Degree Plan Selector</h1>
            <DegreePlanList
                plans={plans}
                currentPlan={currentPlan}
                setCurrentPlan={setCurrentPlan}
            />
            <PlanViewButton setMode={setMode} />
            <CSVExport plans={plans} />
        </div>
    );
}
