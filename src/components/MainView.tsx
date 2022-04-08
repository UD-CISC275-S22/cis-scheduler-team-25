import React from "react";
import { Button } from "react-bootstrap";
import { DegreePlan } from "../interfaces/degreeplan";
import { DegreePlanList } from "./DegreePlanList";

function PlanViewButton({
    setMode
}: {
    setMode: (newMode: string) => void;
}): JSX.Element {
    return <Button onClick={() => setMode("plan")}>View Degree Plan</Button>;
}

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
        </div>
    );
}
