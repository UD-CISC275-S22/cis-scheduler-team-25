import { DropResult } from "react-beautiful-dnd";
import { Course } from "../../interfaces/course";
import { DegreePlan } from "../../interfaces/degreeplan";
import { Semester } from "../../interfaces/semester";
import { courseList } from "../ReadJSON";

type DragEndProps = {
    category: string;
    requirement: string;
    result: DropResult;
    coursePool: Course[];
    semesterPool: Course[];
    currentSemester: Semester;
    setCurrentSemester: (newSemester: Semester) => void;
    setCoursePool: (newCoursePool: Course[]) => void;
    plans: DegreePlan[];
    setPlans: (newPlans: DegreePlan[]) => void;
    currentPlan: DegreePlan;
    setCurrentPlan: (newPlan: DegreePlan) => void;
};

/* handleOnDragEnd is the primary func for handling the drag/drop updating logic
   This file is a module of functions for handleOnDragEnd and its associated
   helper functions

   The action string provides information about where a course is being dragged
   to, i.e. dragged from the coursePool or semester schedule
   States for the currentSemester's courses array and the coursePool itself are updated
*/
export function handleOnDragEnd({
    category,
    requirement,
    result,
    coursePool,
    semesterPool,
    currentSemester,
    plans,
    setPlans,
    currentPlan,
    setCurrentPlan,
    setCurrentSemester,
    setCoursePool
}: DragEndProps): void {
    if (!result.destination) return;

    // arguments to pass to helper functions
    const args = {
        category,
        requirement,
        result,
        coursePool,
        semesterPool,
        currentSemester,
        plans,
        setPlans,
        currentPlan,
        setCurrentPlan,
        setCurrentSemester,
        setCoursePool
    };

    // use result from drag action to discover where the dragged course originated
    // from (source) and where it ended up (destination)
    const action =
        result.source.droppableId.toString() +
        "->" +
        result.destination.droppableId.toString();

    // call helper functions depending on the specified action
    if (action === "semesterPool->semesterPool") {
        handleSemester2Semester(args);
    } else if (action === "coursePool->semesterPool") {
        if (checkPrerequesites(args)) {
            handleCoursePool2Semester(args);
        }
    } else if (action === "semesterPool->coursePool") {
        handleSemester2CoursePool(args);
    }
}
// ================================================================
// ======================= HELPER FUNCTIONS =======================
// ================================================================

// helper function for reordering courses within your currentSemester
function handleSemester2Semester({
    result,
    semesterPool,
    currentSemester,
    plans,
    setPlans,
    currentPlan,
    setCurrentPlan,
    setCurrentSemester
}: DragEndProps): void {
    if (!result.destination) return;

    // copy courses in current semester and remove the dragged course
    const reorderedSemesterCourses = [...semesterPool];
    const [draggedCourses] = reorderedSemesterCourses.splice(
        result.source.index,
        1
    );

    // add dragged course to new semester course list
    reorderedSemesterCourses.splice(
        result.destination.index,
        0,
        draggedCourses
    );

    // create new values for the currentSemester, currentPlan, and plans based
    // on the reorderedSemesterCourses
    const newSemester = {
        ...currentSemester,
        courses: reorderedSemesterCourses
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
}

// helper function for transferring course from coursePool to currentSemester
function handleCoursePool2Semester({
    result,
    coursePool,
    semesterPool,
    currentSemester,
    plans,
    setPlans,
    currentPlan,
    setCurrentPlan,
    setCurrentSemester,
    setCoursePool
}: DragEndProps): void {
    if (!result.destination) return;

    // copy courses in current semester and remove the dragged course
    const draggedCourse = coursePool[result.source.index];
    const reorderedSemesterCourses = [...semesterPool];

    // add dragged course to new semester course list
    reorderedSemesterCourses.splice(result.destination.index, 0, draggedCourse);

    // create new values for the currentSemester, currentPlan, and plans based
    // on the reorderedSemesterCourses
    const newSemester = {
        ...currentSemester,
        courses: reorderedSemesterCourses
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
        coursePool.filter(
            (course: Course): boolean => course.code !== draggedCourse.code
        )
    );
}

// helper function for transferring course from currentSemester to coursePool
function handleSemester2CoursePool({
    category,
    requirement,
    result,
    semesterPool,
    currentSemester,
    plans,
    setPlans,
    currentPlan,
    setCurrentPlan,
    setCurrentSemester,
    setCoursePool
}: DragEndProps): void {
    if (!result.destination) return;

    // copy courses in current semester and remove the dragged course
    const reorderedSemesterCourses = [...semesterPool];

    // remove dragged course to new semester course list
    reorderedSemesterCourses.splice(result.source.index, 1);

    // create new values for the currentSemester, currentPlan, and plans based
    // on the reorderedSemesterCourses
    const newSemester = {
        ...currentSemester,
        courses: reorderedSemesterCourses
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
        courseList.filter(
            (course: Course): boolean =>
                !newSemester.courses
                    .map((currCourse: Course): string => currCourse.code)
                    .includes(course.code) &&
                course.degreeRequirement.includes(category + "-" + requirement)
        )
    );
}

/*
Helper function for checking if a student meets all the required prerequisites
for a course before adding it from the coursePool -> semesterPool.
Only semesters checked PRIOR to the current semester are checked
*/
function checkPrerequesites({
    result,
    coursePool,
    currentSemester,
    currentPlan
}: DragEndProps): boolean {
    const currentIdx = currentPlan.semesters.findIndex(
        (semester: Semester): boolean => semester.id === currentSemester.id
    );

    const takenCourses = currentPlan.semesters
        .slice(0, currentIdx)
        .reduce(
            (courses: Course[], semester: Semester) => [
                ...courses,
                ...semester.courses
            ],
            []
        );

    const draggedCourse = coursePool[result.source.index];
    const coursePreReqs = draggedCourse.preReqs;

    if (coursePreReqs.length === 0) {
        return true;
    }

    const courseChecks = coursePreReqs.map((preReqList: string[]): boolean =>
        isCourseTaken(preReqList, takenCourses)
    );

    return courseChecks.every((check: boolean): boolean => check);
}

/*
Helper function for the checkPrerequisites() helper function.
Used to map an array of course code prerequsites to a boolean value to determine
if that particular requirement is met.
*/
function isCourseTaken(preReqList: string[], takenCourses: Course[]): boolean {
    const takenCourseCodes = takenCourses.map(
        (course: Course): string => course.code
    );

    // Prerequisite arrays with multiple codes represent an "or" requirement,
    // e.g. "CISC 108 or CISC 106", so only one code needs to be taken already
    return preReqList.some((code: string): boolean =>
        takenCourseCodes.includes(code)
    );
}
