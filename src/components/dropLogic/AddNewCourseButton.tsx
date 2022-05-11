import React from "react";
import { Button } from "react-bootstrap";
import "../components.css";
import { usePlanContext } from "../context/PlanContext";
import {
    checkIfCourseExists,
    addNewCourse
} from "./courseModal/utils/courseEditValidation";
import { Course } from "../../interfaces/course";

type AddNewCourseButtonProps = {
    input: string;
    setCurrentCourse: (newCourse: Course) => void;
    courseList: Course[];
    setCourseList: (newCourses: Course[]) => void;
    setCoursePool: (newCourses: Course[]) => void;
    category: string;
    requirement: string;
    setStatus: (s: string) => void;
    setAlertActive: (a: boolean) => void;
};

export function AddNewCourseButton({
    input,
    setCurrentCourse,
    courseList,
    setCourseList,
    setCoursePool,
    category,
    requirement,
    setStatus,
    setAlertActive
}: AddNewCourseButtonProps): JSX.Element {
    const disabled = !checkIfCourseExists(input);
    const {
        plans,
        setPlans,
        currentPlan,
        setCurrentPlan,
        currentSemester,
        setCurrentSemester
    } = usePlanContext();

    function updateCourseList() {
        const success = addNewCourse(
            input,
            setCurrentCourse,
            courseList,
            setCourseList,
            currentSemester,
            setCurrentSemester,
            currentPlan,
            setCurrentPlan,
            plans,
            setPlans,
            setCoursePool,
            category + "-" + requirement
        );

        if (success) {
            setStatus("courseAutoCompleteSuccess");
            setAlertActive(true);
        }
    }

    return (
        <Button
            disabled={disabled}
            variant="success"
            data-testid="add-autocomplete-course-button"
            onClick={() => updateCourseList()}
        >
            {disabled ? "Invalid Course" : "Add Course To Pool"}
        </Button>
    );
}
