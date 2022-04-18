import { DropResult } from "react-beautiful-dnd";
import { Course } from "../../interfaces/course";
import { DegreePlan } from "../../interfaces/degreeplan";
import { Semester } from "../../interfaces/semester";
import { courseList } from "../ReadJSON";

type DragEndProps = {
    category: string;
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
}: DragEndProps) {
    if (!result.destination) return;

    // arguments to pass to helper functions
    const args = {
        category,
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
        handleCoursePool2Semester(args);
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
}: DragEndProps) {
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
}: DragEndProps) {
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
    result,
    semesterPool,
    currentSemester,
    plans,
    setPlans,
    currentPlan,
    setCurrentPlan,
    setCurrentSemester,
    setCoursePool
}: DragEndProps) {
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
                course.degreeCategory.includes(category)
        )
    );
}
