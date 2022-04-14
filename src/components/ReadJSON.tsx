import React, { useState, useEffect } from "react";
import { Course } from "../interfaces/course";
import { Section } from "../interfaces/section";
import catalog from "./catalog.json";

//read into array of Course objects
const DEFAULT_COURSES: Course[] = catalog.map(
    (course): Course => ({
        ...course

        //add empty array of Section objects as sections property of Course
        // sections: course.sections.map(
        //     (section): Section => ({
        //         ...section
        //     })
        // )
    })
);
