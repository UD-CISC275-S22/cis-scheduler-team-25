import { Course } from "../../../interfaces/course";
import { catalog } from "../../ReadJSON";

function saveChanges(
    name: string,
    descr: string,
    credits: string,
    preReqs: string,
    degreeRequirement: string[],
    currentCourse: Course,
    courseList: Course[],
    setCourseList: (newCourses: Course[]) => void
) {
    const editedPreReqs = preReqs
        .trim()
        .split("\n")
        .map((preReqGroup: string): string[] => preReqGroup.split(","));

    const editedCourse = {
        ...currentCourse,
        name: name.trim(),
        descr: descr.trim(),
        credits: credits.trim(),
        preReqs: editedPreReqs,
        degreeRequirement: degreeRequirement
    };

    const newCourseList = courseList.map(
        (course: Course): Course =>
            course.code === currentCourse.code ? editedCourse : course
    );
    setCourseList(newCourseList);
}

function checkIfCourseExists(code: string) {
    // get dept codes (first 4 chars of code, CISC, BISC, etc)
    const dept = code.slice(0, 4);

    // check if dept is valid (exists in catalog)
    if (catalog[dept] === undefined) {
        return false;
    }

    // if dept valid, check if code exists in dept
    if (catalog[dept][code] === undefined) {
        return false;
    }

    return true;
}

function checkPreReqGroup(group: string[]) {
    return group.every((code: string): boolean => checkIfCourseExists(code));
}

function checkValidFields(
    name: string,
    descr: string,
    credits: string,
    preReqs: string,
    degreeRequirement: string[]
): boolean {
    // prevent empty strings in these fields
    if (name.trim() === "" || descr.trim() === "" || credits.trim() === "") {
        return false;
    }

    // course should satisfy at least one degreeRequirement
    if (degreeRequirement.length === 0) {
        return false;
    }

    // skip checking preReqs if there are none
    if (preReqs.trim().length === 0) {
        return true;
    }

    // turn preReqs string into a proper string[][]
    const editedPreReqs = preReqs
        .split("\n")
        .map((preReqGroup: string): string[] => preReqGroup.split(","));

    // check every preReqGroup generated from the converted string
    const preReqChecks = editedPreReqs.map((preReqGroup: string[]): boolean =>
        checkPreReqGroup(preReqGroup)
    );

    // return whether or not every group of preReqs is valid
    return preReqChecks.every((check: boolean): boolean => check);
}

export { saveChanges, checkValidFields };
