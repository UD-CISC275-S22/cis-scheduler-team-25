import { Course } from "../../interfaces/course";
import { DegreePlan } from "../../interfaces/degreeplan";
import { Semester } from "../../interfaces/semester";
import { course2Row } from "./utils/CSVUtils";

export function planToCSV(currPlan: DegreePlan): string {
    const courseStrings = currPlan.semesters.map(
        (currSemester: Semester): string[] =>
            currSemester.courses.map((course: Course): string =>
                course2Row(currSemester, course)
            )
    );

    const csvOutput = courseStrings
        .map((semesterGroup: string[]): string => semesterGroup.join("\n"))
        .join("\n");

    return csvOutput;
}
