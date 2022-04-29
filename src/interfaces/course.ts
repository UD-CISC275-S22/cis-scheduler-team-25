export interface Course {
    // string containing a Course code name, ex CISC 108
    code: string;
    // name of course
    name: string;
    //description of the course
    descr: string;
    // credit value for this course
    credits: string;
    // Array containing arrays of course codes; allows you to handle "or"
    // requirements where only one course of many is required
    preReqs: string[][];
    // Description of preReqs
    preReqDesc: string;
    //restrictions for who can take the course
    restrict: string;
    //University breadth category
    breadth: string;
    //availability
    typ: string;
    // Requirement that the course fulfills for a degree
    degreeRequirement: string[];
    // Array of sections for this course
    // sections: Section[];s
}
