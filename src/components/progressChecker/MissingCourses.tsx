import React from "react";
import "../components.css";
import { Course } from "../../interfaces/course";
import Collapsible from "react-collapsible";
import { DegreePlan } from "../../interfaces/degreeplan";
import { getUnusedCourses } from "../dropLogic/utils/dragUtils";

type MissingCoursesProps = {
    requiredCourses: Course[];
    currentPlan: DegreePlan;
    category: string;
    requirement: string;
};

export function MissingCourses({
    requiredCourses,
    currentPlan,
    category,
    requirement
}: MissingCoursesProps): JSX.Element {
    const lastSemester =
        currentPlan.semesters[currentPlan.semesters.length - 1];
    const missingCourses = getUnusedCourses(
        currentPlan,
        lastSemester,
        requiredCourses,
        category + "-" + requirement
    );

    return (
        <Collapsible
            className="collapsible"
            trigger={"View " + requirement + " Progress"}
        >
            <p>Requirement not met; can choose from the following courses:</p>
            <ul>
                {missingCourses.map(
                    (course: Course): JSX.Element => (
                        <li key={course.code}>{course.code}</li>
                    )
                )}
            </ul>
        </Collapsible>
    );
}
