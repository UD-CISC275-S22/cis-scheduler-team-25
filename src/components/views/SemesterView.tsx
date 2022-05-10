import React from "react";
import { Button } from "react-bootstrap";
import { Course } from "../../interfaces/course";
import { usePlanContext } from "../context/PlanContext";
import { CourseDragDrop } from "../dropLogic/CourseDragDrop";

type SemesterViewProps = {
    setMode: (newMode: string) => void;
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
    courseList,
    setCourseList
}: SemesterViewProps): JSX.Element {
    const { currentSemester } = usePlanContext();

    return (
        <div>
            <h1>
                Schedule for{" "}
                {currentSemester.season.toString() +
                    "-" +
                    currentSemester.year.toString()}
            </h1>
            <CourseDragDrop
                courseList={courseList}
                setCourseList={setCourseList}
            />
            <div></div>
            <PlanViewButton setMode={setMode} />
        </div>
    );
}
