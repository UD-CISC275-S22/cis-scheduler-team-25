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
    currentCourse: Course;
    setCurrentCourse: (newCourse: Course) => void;
    courseList: Course[];
    setCourseList: (newCourses: Course[]) => void;
    setCoursePool: (newCourses: Course[]) => void;
    category: string;
    requirement: string;
};

export function AddNewCourseButton({
    input,
    currentCourse,
    setCurrentCourse,
    courseList,
    setCourseList,
    setCoursePool,
    category,
    requirement
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

    return (
        <Button
            disabled={disabled}
            variant="primary"
            onClick={() => {
                addNewCourse(
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
            }}
        >
            {disabled ? "Invalid Course" : "Add Course To Pool"}
        </Button>
    );
}
