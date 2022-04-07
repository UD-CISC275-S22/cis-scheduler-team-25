import { Section } from "./section";
export interface Course {
    // name of course
    name: string;
    // credit value for this course
    credits: number;
    // Prereqs: course ID numbers
    prereqs: number[];
    // coreqs: course ID numbers
    coreqs: number[];
    /* numeric code for a course, e.g. 1.181 corresponds to CISC181,
    where CISC = 1 and .181 identifies the department course number */
    courseCode: number;
    // Array of sections for this course
    sections: Section[];
}
