import React from "react";
import { Button } from "react-bootstrap";
import { Course } from "../../interfaces/course";
import { DegreePlan } from "../../interfaces/degreeplan";
import { Semester } from "../../interfaces/semester";
import { CourseDragDrop } from "../dropLogic/CourseDragDrop";

type SemesterViewProps = {
    setMode: (newMode: string) => void;
    setCurrentSemester: (currentSemester: Semester) => void;
    setCurrentPlan: (currentPlan: DegreePlan) => void;
    currentSemester: Semester;
    setPlans: (plans: DegreePlan[]) => void;
    currentPlan: DegreePlan;
    plans: DegreePlan[];
    courseList: Course[];
    setCourseList: (newCourses: Course[]) => void;
};

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
            Return to Degree Plan
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
    setPlans,
    currentPlan,
    plans,
    currentSemester,
    courseList,
    setCourseList
}: SemesterViewProps): JSX.Element {
    return (
        <div>
            <h1>
                Schedule for{" "}
                {currentSemester.season.toString() +
                    "-" +
                    currentSemester.year.toString()}
            </h1>
            <CourseDragDrop
                currentSemester={currentSemester}
                setCurrentSemester={setCurrentSemester}
                plans={plans}
                setPlans={setPlans}
                currentPlan={currentPlan}
                setCurrentPlan={setCurrentPlan}
                courseList={courseList}
                setCourseList={setCourseList}
            />
            <div></div>
            <PlanViewButton setMode={setMode} />
        </div>
    );
}
