import { Course } from "../../interfaces/course";
import { DegreePlan } from "../../interfaces/degreeplan";
import { Semester } from "../../interfaces/semester";

export interface CSVTable {
    code: string;
    // name of course
    semester: string;
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
    degreeRequirements: string[];
}

export function validConvertCSV(currPlan: DegreePlan): CSVTable[] {
    return currPlan.semesters.reduce((result: CSVTable[], semester: Semester): CSVTable[] => {
        return [
            ...result,
            ...semester.courses.reduce((
                courseTable: CSVTable[],
                course: Course
            ): CSVTable[] => {
                return [
                    ...courseTable,
                    {
                        
                    }
                ]
            })
        ]
    })
