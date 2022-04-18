// import { Section } from "./section";
export interface Course {
    /* numeric code for a course, e.g. 1.181 corresponds to CISC181,
    where CISC = 1 and .181 identifies the department course number */
    code: string;
    // name of course
    name: string;
    //description of the course
    descr: string;
    // credit value for this course
    credits: string;
    // Prereqs: course ID numbers
    preReq: string;
    //restrictions for who can take the course
    restrict: string;
    //University breadth category
    breadth: string;
    //availability
    typ: string;
    // Requirement that the course fulfills for a degree
    degreeCategory: string[];
    // Array of sections for this course
    // sections: Section[];s
}
