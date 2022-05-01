import { Course } from "../../../../interfaces/course";
import { DegreePlan } from "../../../../interfaces/degreeplan";
import { Semester } from "../../../../interfaces/semester";
import { checkPrerequesites, isCourseTaken } from "../../handleOnDragEnd";

/**
 * Validation function for checking if transferring a course from one semester
 * to another will cause prerequisite conflicts. Returns true if no conflicts
 * are found, false otherwise.
 * @param currentCourse Course currently being observed in the modal
 * @param currentSemester Semester you're currently in
 * @param currentPlan Plan you're currently in
 * @param transferId Id of the semester you're going to transfer to
 */
export function validateTransfer(
    currentCourse: Course,
    currentSemester: Semester,
    currentPlan: DegreePlan,
    transferId: number
): boolean {
    if (isNaN(transferId)) {
        return false;
    }

    // validating a transfer to a semester in an earlier semester relative to current
    if (currentSemester.id > transferId) {
        const courseIdx = currentSemester.courses.findIndex(
            (course: Course): boolean => course.code === currentCourse.code
        );

        const destSemester = currentPlan.semesters.find(
            (semester: Semester): boolean => semester.id === transferId
        );

        if (destSemester === undefined) {
            return false;
        }

        return checkPrerequesites(
            courseIdx,
            currentSemester.courses,
            destSemester,
            currentPlan
        );
        // validating a transfer to a semester in a future semester relative to current
    } else if (currentSemester.id < transferId) {
        // index of the current semester
        const currentIdx = currentPlan.semesters.findIndex(
            (semester: Semester): boolean => semester.id === currentSemester.id
        );

        // index of the destination semester
        const destIdx = currentPlan.semesters.findIndex(
            (semester: Semester): boolean => semester.id === transferId
        );

        // courses taken between the current semester and the destination semester
        const takenCourses = currentPlan.semesters
            .slice(currentIdx, destIdx + 1)
            .reduce(
                (courses: Course[], semester: Semester) => [
                    ...courses,
                    ...semester.courses
                ],
                []
            );

        // console.log(takenCourses);
        // if (takenCourses.length === 0) {
        //     return true;
        // }

        // get all prerequsites in the takenCourses
        const requiredPreReqs = takenCourses.reduce(
            (allPreReqs: string[], course: Course) => [
                ...allPreReqs,
                ...course.preReqs.reduce(
                    (coursePreReqs: string[], preReqs: string[]) => [
                        ...coursePreReqs,
                        ...preReqs
                    ],
                    []
                )
            ],
            []
        );

        // console.log(requiredPreReqs);

        // if our currentCourse doesn't appear in the required prerequisites in any
        // later semesters, permit the transfer
        return !requiredPreReqs.includes(currentCourse.code);
    }

    return false;
}
