import React, { useState } from "react";

import "./components.css";
import { ProgressList } from "./ProgressList";
import { Course } from "../../interfaces/course";
import { Semester } from "../../interfaces/semester";
import Collapsible from "react-collapsible";

export function MissingCourses({
    courseList,
    currentSemester
}: {
    courseList: Course[];
    currentSemester: Semester;
}): JSX.Element {
    //code here
    return (
        <Collapsible
            className="collapsible"
            trigger="View CISC Core Requirements"
        >
            <p>missing the following courses:</p>
        </Collapsible>
    );
}
