import { Course } from "../../../interfaces/course";
import { DegreePlan } from "../../../interfaces/degreeplan";
import { Semester } from "../../../interfaces/semester";
import { catalog } from "../../ReadJSON";

function saveChanges(
    name: string,
    descr: string,
    credits: string,
    preReqs: string,
    degreeRequirement: string[],
    currentCourse: Course,
    setCurrentCourse: (newCourse: Course) => void,
    courseList: Course[],
    setCourseList: (newCourses: Course[]) => void,
    currentSemester: Semester,
    setCurrentSemester: (newSemester: Semester) => void,
    currentPlan: DegreePlan,
    setCurrentPlan: (newPlan: DegreePlan) => void,
    plans: DegreePlan[],
    setPlans: (newPlans: DegreePlan[]) => void,
    setCoursePool: (newCourses: Course[]) => void,
    category: string,
    requirement: string
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

    setCurrentCourse(editedCourse);
    setCourseList(newCourseList);

    const newSemester = {
        ...currentSemester,
        courses: currentSemester.courses.map(
            (course: Course): Course =>
                course.code === editedCourse.code ? editedCourse : course
        )
    };

    const newPlan = {
        ...currentPlan,
        semesters: currentPlan.semesters.map(
            (semester: Semester): Semester =>
                semester.id === currentSemester.id ? newSemester : semester
        )
    };
    const newPlans = plans.map(
        (plan: DegreePlan): DegreePlan =>
            plan.id === currentPlan.id ? newPlan : plan
    );

    // set state to new values
    setCurrentSemester(newSemester);
    setCurrentPlan(newPlan);
    setPlans(newPlans);

    setCoursePool(
        newCourseList.filter(
            (course: Course): boolean =>
                !newSemester.courses
                    .map((currCourse: Course): string => currCourse.code)
                    .includes(course.code) &&
                course.degreeRequirement.includes(category + "-" + requirement)
        )
    );
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
