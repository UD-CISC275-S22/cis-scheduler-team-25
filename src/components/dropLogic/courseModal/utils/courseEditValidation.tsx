import { Course } from "../../../../interfaces/course";
import { EditableCourse } from "../../../../interfaces/editable_course";
import { DegreePlan } from "../../../../interfaces/degreeplan";
import { Semester } from "../../../../interfaces/semester";
import { catalog } from "../../../ReadJSON";
import CourseCategoriesData from "../../../../data/category_courses.json";
import CategoryRequirements from "../../../../data/degree_categories.json";

/**
 * Implements all the changes made in an EditableCourse object to be used to modify
 * a Course in a courseList.
 * @param editCourse EditableCourse object with new changes to be used for selected Course object
 */
function saveChanges(
    editCourse: EditableCourse | Course,
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
    reqFilter: string
) {
    let editedPreReqs: string[][];

    if (typeof editCourse.preReqs === "string") {
        // if editCourse.preReqs is a string, editCourse is an EditableCourse
        editedPreReqs = editCourse.preReqs
            .trim()
            .split("\n")
            .map((preReqGroup: string): string[] => preReqGroup.split(","));
    } else {
        // otherwise, editCourse.prereqs must already be a string[][]
        editedPreReqs = editCourse.preReqs;
    }

    const newCourse = {
        ...currentCourse,
        name: editCourse.name.trim(),
        descr: editCourse.descr.trim(),
        credits: editCourse.credits.trim(),
        preReqs: editedPreReqs,
        preReqDesc: editCourse.preReqDesc.trim(),
        degreeRequirements: editCourse.degreeRequirements
    };

    let newCourseList: Course[];
    // if the editCourse is already in the courseList, we are MODIFYING AN
    // EXISTING COURSE! Otherwise, this is a new course being added to
    // the courseList
    if (
        courseList
            .map((course: Course): string => course.code)
            .includes(newCourse.code)
    ) {
        newCourseList = courseList.map(
            (course: Course): Course =>
                course.code === currentCourse.code ? newCourse : course
        );
    } else {
        newCourseList = [...courseList, newCourse];
    }

    setCurrentCourse(newCourse);
    setCourseList(newCourseList);

    const newSemester = {
        ...currentSemester,
        courses: currentSemester.courses.map(
            (course: Course): Course =>
                course.code === newCourse.code ? newCourse : course
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
                course.degreeRequirements.includes(reqFilter)
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

/**
 * Validates all the changes made in an EditableCourse object to be used to modify
 * a Course in a courseList. Returns a boolean describing if all tests pass.
 * @param editCourse EditableCourse object with new changes to be used for selected Course object
 */
function checkValidFields(editCourse: EditableCourse): boolean {
    // prevent empty strings in these fields
    if (
        editCourse.name.trim() === "" ||
        editCourse.descr.trim() === "" ||
        editCourse.credits.trim() === ""
    ) {
        return false;
    }

    // course should satisfy at least one degreeRequirements
    if (editCourse.degreeRequirements.length === 0) {
        return false;
    }

    // skip checking preReqs if there are none
    if (editCourse.preReqs.trim().length === 0) {
        return true;
    }

    // turn preReqs string into a proper string[][]
    const editedPreReqs = editCourse.preReqs
        .split("\n")
        .map((preReqGroup: string): string[] => preReqGroup.split(","));

    // check every preReqGroup generated from the converted string
    const preReqChecks = editedPreReqs.map((preReqGroup: string[]): boolean =>
        checkPreReqGroup(preReqGroup)
    );

    // return whether or not every group of preReqs is valid
    return preReqChecks.every((check: boolean): boolean => check);
}

/**
 * Takes in a course code and returns the default information specified by
 * the catalog.json and category_courses.json.
 * If the course isn't natively defined in General or a concentration already,
 * that course is default assigned into the Custom Category
 * @param code Course code of the course you're querying for
 */
function getDefaultCourse(code: string): Course {
    // get CatalogCourse from master catalog, and create a new
    // default course using the catalogCourse's original info
    const catalogCourse = catalog[code.slice(0, 4).trim()][code];
    const defaultCourse: Course = {
        ...catalogCourse,
        credits: catalogCourse.credits.trim(),
        degreeRequirements: []
    };

    // Use through CourseCategoriesData and CategoryRequirements
    // to acquire the original degreeRequirements that the course fulfills
    const CISCCourses = CourseCategoriesData as Record<
        string,
        Record<string, string[]>
    >;

    const categoryRequirements = CategoryRequirements as Record<
        string,
        string[]
    >;
    // Get array of degree requirement categories
    const categories = Object.keys(categoryRequirements);

    const result = categories.map((category: string): string[] =>
        categoryRequirements[category].reduce(
            (preReqs: string[], req: string) =>
                CISCCourses[category][req].includes(code)
                    ? [...preReqs, category + "-" + req]
                    : [...preReqs],
            []
        )
    );

    let degreeRequirements: string[];
    degreeRequirements = result.reduce(
        (allPreReqs: string[], preReqGroup: string[]) => [
            ...allPreReqs,
            ...preReqGroup
        ],
        []
    );

    // if absolutely no degreeRequirements are found, the course must be from
    // the Custom Category
    if (degreeRequirements.length === 0) {
        degreeRequirements = ["Custom Category-User Selected Courses"];
    }

    return { ...defaultCourse, degreeRequirements: degreeRequirements };
}

export { saveChanges, checkValidFields, getDefaultCourse };
