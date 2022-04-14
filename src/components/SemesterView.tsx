import React from "react";
import { Button } from "react-bootstrap";
import { JsxAttributeLike } from "typescript";
import { Course } from "../interfaces/course";
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

function RemoveAllCourses({
    setCurrentSemester,
    currentSemester
}: {
    setCurrentSemester: (currentSemester: Semester) => void;
    currentSemester: Semester;
}): JSX.Element {
    return (
        <Button
            data-testid="remove-all-courses-from-semester"
            className="mode-button"
            onClick={() => {
                setCurrentSemester({ ...currentSemester, courses: [] });
            }}
        >
            Remove All Courses
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
    setCurrentSemester,
    currentSemester
}: {
    setMode: (newMode: string) => void;
    setCurrentSemester: (currentSemester: Semester) => void;
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
            <div>
                FOR TESTING PURPOSES: {currentSemester.courses.toString()}
            </div>
            <RemoveAllCourses
                setCurrentSemester={setCurrentSemester}
                currentSemester={currentSemester}
            ></RemoveAllCourses>
            <div></div>
            <PlanViewButton setMode={setMode} />
        </div>
    );
}
