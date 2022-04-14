import { check } from "prettier";
import React from "react";
import { Button } from "react-bootstrap";
import { DegreePlan } from "../interfaces/degreeplan";
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
    setCurrentPlan,
    //setPlans,
    currentPlan,
    //plans,
    currentSemester
}: {
    setCurrentSemester: (currentSemester: Semester) => void;
    setCurrentPlan: (currentPlan: DegreePlan) => void;
    //setPlans: (plans: DegreePlan[]) => void;
    currentPlan: DegreePlan;
    currentSemester: Semester;
    //plans: DegreePlan[];
}): JSX.Element {
    return (
        <Button
            data-testid="remove-all-courses-from-semester"
            className="mode-button"
            onClick={() => {
                const newSemester = { ...currentSemester, courses: [] };
                const updateSemesters = currentPlan.semesters.map(
                    (checkSemester: Semester): Semester =>
                        checkSemester.season === newSemester.season
                            ? newSemester
                            : checkSemester
                );
                const newDegreePlan = {
                    ...currentPlan,
                    semesters: updateSemesters
                };
                setCurrentSemester(newSemester);
                setCurrentPlan(newDegreePlan);
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
    setCurrentPlan,
    //setPlans,
    currentPlan,
    //plans,
    currentSemester
}: {
    setMode: (newMode: string) => void;
    setCurrentSemester: (currentSemester: Semester) => void;
    setCurrentPlan: (currentPlan: DegreePlan) => void;
    currentSemester: Semester;
    //setPlans: (plans: DegreePlan[]) => void;
    currentPlan: DegreePlan;
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
                setCurrentPlan={setCurrentPlan}
                currentPlan={currentPlan}
                currentSemester={currentSemester}
            ></RemoveAllCourses>
            <div></div>
            <PlanViewButton setMode={setMode} />
        </div>
    );
}
