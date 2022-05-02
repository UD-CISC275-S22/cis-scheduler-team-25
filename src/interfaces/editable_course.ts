/*
Separate interface for editing a course; reduces the amount of args passed
between components
*/
export interface EditableCourse {
    // name of course
    name: string;
    //description of the course
    descr: string;
    // credit value for this course
    credits: string;
    // Array containing arrays of course codes; allows you to handle "or"
    // requirements where only one course of many is required
    preReqs: string;
    // Requirement that the course fulfills for a degree
    degreeRequirements: string[];
}
