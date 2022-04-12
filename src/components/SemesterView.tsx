import React from "react";
import { Button } from "react-bootstrap";
import { Semester } from "../interfaces/semester";

// Button for returning back to the PlanView
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

/*
View for editing the courses in a specific semester, allow for drag and drop
from a list of available courses and also showing the time schedule of your
selected classes
*/
export function SemesterView({
    setMode,
    currentSemester
}: {
    setMode: (newMode: string) => void;
    currentSemester: Semester;
}): JSX.Element {
    return (
        <div>
            <h1>
                Schedule for{" "}
                {currentSemester.season.toString() +
                    "-" +
                    currentSemester.year.toString()}
            </h1>
            <PlanViewButton setMode={setMode} />
        </div>
    );
}
