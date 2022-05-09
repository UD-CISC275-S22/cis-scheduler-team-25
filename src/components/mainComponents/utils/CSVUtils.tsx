import { Course } from "../../../interfaces/course";
import { Semester } from "../../../interfaces/semester";
import INVALID_COURSE from "../../../data/invalid_course.json";
import { DegreePlan } from "../../../interfaces/degreeplan";
import { getSemesterId } from "../../planComponents/utils/addSemesterUtils";
import { getNextId } from "./insertPlanUtils";

function flankQuotes(value: string): string {
    const doubleQuote = String.fromCharCode(34);
    const newValue = value === "" ? " " : value;
    return (
        doubleQuote +
        newValue.replace(doubleQuote, doubleQuote + doubleQuote) +
        doubleQuote
    );
}

function unFlankQuotes(value: string): string {
    const doubleQuote = String.fromCharCode(34);
    const spacer = doubleQuote + "," + doubleQuote;
    console.log(spacer);
    const formattedValue = value
        .replaceAll("\n", "")
        .replaceAll(doubleQuote + doubleQuote, doubleQuote)
        .replaceAll(spacer, "$$$$$");

    return formattedValue.slice(1, -1);
}

function course2Row(semester: Semester, course: Course): string {
    const row =
        flankQuotes(semester.season + "-" + semester.year.toString()) +
        "," +
        flankQuotes(course.code) +
        "," +
        flankQuotes(course.name) +
        "," +
        flankQuotes(course.descr) +
        "," +
        flankQuotes(course.credits) +
        "," +
        flankQuotes(
            course.preReqs
                .map((reqGroup: string[]): string => reqGroup.join("_"))
                .join("|")
        ) +
        "," +
        flankQuotes(course.preReqDesc) +
        "," +
        flankQuotes(course.restrict) +
        "," +
        flankQuotes(course.breadth) +
        "," +
        flankQuotes(course.typ) +
        "," +
        flankQuotes(course.degreeRequirements.join("_"));

    return row;
}

function row2Course(row: string[]): Course {
    console.log(row);
    if (row.length !== 10) {
        console.log("wrong size array entered, returning invalid course");
        return { ...INVALID_COURSE };
    }

    // trim whitespace from courses caused by import
    const trimRow = row.map((field: string): string => field.trim());

    const course = {
        code: trimRow[0],
        name: trimRow[1],
        descr: trimRow[2],
        credits: trimRow[3],
        preReqs: trimRow[4]
            .split("|")
            .map((reqGroup: string): string[] => reqGroup.split("_")),
        preReqDesc: trimRow[5],
        restrict: trimRow[6],
        breadth: trimRow[7],
        typ: trimRow[8],
        degreeRequirements: trimRow[9].split("_")
    };

    return course;
}

function planToCSV(currPlan: DegreePlan): string {
    // First row and second row spacer
    const header = `Plan:,${currPlan.name},Degree:,${currPlan.degree.name}\n\n`;

    // Third row (columns)
    const columns =
        "Semester,Course Code,Course Name,Description,Credits,Prerequisites,Prequesite Description,Restrictions,Breadth Details,Typical Availability,Degree Requirements\n";

    const courseStrings = currPlan.semesters.map(
        (currSemester: Semester): string[] =>
            currSemester.courses.map((course: Course): string =>
                course2Row(currSemester, course)
            )
    );

    const csvRows = courseStrings
        .map((semesterGroup: string[]): string => semesterGroup.join("\n"))
        .join("\n");

    return header + columns + csvRows;
}

function CSVToPlan(
    rawCSV: string,
    plans: DegreePlan[],
    setPlans: (newPlans: DegreePlan[]) => void
) {
    const rawCSVArray = rawCSV.split("\n");
    console.log(rawCSVArray);
    const formattedCSVArray = rawCSVArray.map((row: string): string =>
        unFlankQuotes(row)
    );

    console.log(formattedCSVArray);

    const rowArr = formattedCSVArray
        .slice(3)
        .map((row: string): string[] => row.split("$$$"));

    const semesterRecord = rowArr.reduce(
        (semesters: Record<string, Course[]>, rowArr: string[]) =>
            reduceRowArr(semesters, rowArr),
        {}
    );

    const semesters = formatSemesterRecord(semesterRecord);

    // contains degree plan name and degree information
    const header = rawCSVArray[0].split(",");

    // if any existing plan matches the imported plan's name, tack on (copy), otherwise
    // keep original
    const importedPlanName = plans.some(
        (plan: DegreePlan): boolean => plan.name === header[1]
    )
        ? header[1] + " (copy)"
        : header[1];

    const importedPlan = {
        id: getNextId(plans),
        name: importedPlanName,
        semesters: semesters,
        degree: { name: header[3], concentration: header[3].split(" - ")[1] }
    };

    console.log(importedPlan);

    setPlans([...plans, importedPlan]);
}

function reduceRowArr(
    semesters: Record<string, Course[]>,
    rowArr: string[]
): Record<string, Course[]> {
    const semesterName = rowArr[0];
    const newSemesters = { ...semesters };

    if (newSemesters[semesterName] === undefined) {
        newSemesters[semesterName] = [row2Course(rowArr.slice(1))];
    } else {
        newSemesters[semesterName] = [
            ...newSemesters[semesterName],
            row2Course(rowArr.slice(1))
        ];
    }

    return newSemesters;
}

function formatSemesterRecord(
    semesterRecord: Record<string, Course[]>
): Semester[] {
    const semesters = Object.keys(semesterRecord).map(
        (semesterName: string): Semester => ({
            id: getSemesterId(
                semesterName.split("-")[0],
                parseInt(semesterName.split("-")[1])
            ),
            courses: semesterRecord[semesterName],
            season: semesterName.split("-")[0],
            year: parseInt(semesterName.split("-")[1])
        })
    );

    return semesters;
}

export { planToCSV, CSVToPlan };
