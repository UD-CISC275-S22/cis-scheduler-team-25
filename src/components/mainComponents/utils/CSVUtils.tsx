import { Course } from "../../../interfaces/course";
import { Semester } from "../../../interfaces/semester";
import INVALID_COURSE from "../../../data/invalid_course.json";
import { DegreePlan } from "../../../interfaces/degreeplan";

function course2Row(semester: Semester, course: Course): string {
    function flankQuotes(value: string): string {
        const doubleQuote = String.fromCharCode(34);
        return (
            doubleQuote +
            value.replace(doubleQuote, doubleQuote + doubleQuote) +
            doubleQuote
        );
    }

    const row =
        semester.season +
        "-" +
        semester.year.toString() +
        "," +
        course.code +
        "," +
        flankQuotes(course.name) +
        "," +
        flankQuotes(course.descr) +
        "," +
        course.credits +
        "," +
        course.preReqs
            .map((reqGroup: string[]): string => reqGroup.join("_"))
            .join("|") +
        "," +
        flankQuotes(course.preReqDesc) +
        "," +
        flankQuotes(course.restrict) +
        "," +
        flankQuotes(course.breadth) +
        "," +
        flankQuotes(course.typ) +
        "," +
        course.degreeRequirements.join("_");

    return row;
}

function row2Course(row: string[]): Course {
    if (row.length !== 10) {
        console.log("wrong size array entered, returning invalid course");
        return { ...INVALID_COURSE };
    }

    const course = {
        code: row[0],
        name: row[1],
        descr: row[2],
        credits: row[3],
        preReqs: row[4]
            .split("|")
            .map((reqGroup: string): string[] => reqGroup.split("_")),
        preReqDesc: row[5],
        restrict: row[6],
        breadth: row[7],
        typ: row[8],
        degreeRequirements: row[9].split("_")
    };

    return course;
}

function planToCSV(currPlan: DegreePlan): string {
    const header =
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

    // const csvOutput = header + csvRows;

    return header + csvRows;
}

function CSVToPlan(rawCSV: string) {
    const rowArr = rawCSV
        .split("\n")
        .map((row: string): string[] => row.split(","));

    const semesterRecord = rowArr.reduce(
        (semesters: Record<string, Course[]>, rowArr: string[]) =>
            reduceRowArr(semesters, rowArr),
        {}
    );
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
        (semName: string): Semester => ({
            id: 0,
            courses: semesterRecord[semName],
            season: semName.split("-")[0],
            year: parseInt(semName.split("-")[1])
        })
    );

    return semesters;
}

export { course2Row, row2Course, planToCSV };
