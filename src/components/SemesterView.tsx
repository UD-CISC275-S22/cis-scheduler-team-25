import React from "react";
import { Button } from "react-bootstrap";

function PlanViewButton({
    setMode
}: {
    setMode: (newMode: string) => void;
}): JSX.Element {
    return (
        <Button
            data-testid="semester-plan-button"
            onClick={() => setMode("plan")}
        >
            View Degree Plan
        </Button>
    );
}

export function SemesterView({
    setMode
}: {
    setMode: (newMode: string) => void;
}): JSX.Element {
    return (
        <div>
            <h1>Your Semester Schedule</h1>
            <PlanViewButton setMode={setMode} />
        </div>
    );
}
