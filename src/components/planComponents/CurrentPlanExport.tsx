import { Course } from "../../interfaces/course";
import { DegreePlan } from "../../interfaces/degreeplan";
import { Semester } from "../../interfaces/semester";

export function courseToCSV(currPlan: DegreePlan): string[] {
    let csvArray: string[];
    currPlan.semesters.map((currSemester: Semester): void => {
        {
            const coursesString = currSemester.courses.map(
                (course: Course): string => {
                    {
                        const returnString =
                            course.code.toString() +
                            "," +
                            course.name +
                            "," +
                            course.descr +
                            "," +
                            course.credits +
                            "," +
                            course.preReqs
                                .map((reqGroup: string[]): string =>
                                    reqGroup.join("_")
                                )
                                .join("|") +
                            "," +
                            course.preReqDesc +
                            "," +
                            course.restrict +
                            "," +
                            course.breadth +
                            "," +
                            course.typ +
                            "," +
                            course.degreeRequirements.join("_");
                        return returnString;
                    }
                }
            );
            csvArray.push(
                currSemester.season +
                    "," +
                    currSemester.year.toString() +
                    coursesString
            );
        }
    });
    return csvArray;
}
