import React, { useState } from "react";
import { DegreePlan } from "../interfaces/degreeplan";
import { Button, Modal } from "react-bootstrap";
import "./components.css";
import { ProgressList } from "./ProgressList";
import { PlanView } from "./views/PlanView";
import { Course } from "../interfaces/course";
import { Semester } from "../interfaces/semester";

export function MissingCourses({
    courseList,
    currentSemester
}: {
    courseList: Course[];
    currentSemester: Semester;
}): JSX.Element {
    courseList.filter(
        (course: Course): boolean =>
            !currentSemester.courses
                .map((currCourse: Course): string => currCourse.code)
                .includes(course.code) &&
            course.degreeRequirement.includes("General" + "-" + "CISC Core")
    );
    return <p>x</p>;
}
