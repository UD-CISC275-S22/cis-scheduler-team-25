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

    const action =
        result.source.droppableId.toString() +
        "->" +
        result.destination.droppableId.toString();
    if (action === "semesterPool->semesterPool") {
        handleSemester2Semester(args);
    } else if (action === "coursePool->semesterPool") {
        handleCourse2Semester(args);
    } else if (action === "semesterPool->coursePool") {
        handleSemester2Course(args);
    }
}
// ================================================================
// ======================= HELPER FUNCTIONS =======================
// ================================================================

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

    const reorderedSemesterCourses = [...semesterPool];
    const [draggedCourses] = reorderedSemesterCourses.splice(
        result.source.index,
        1
    );
    reorderedSemesterCourses.splice(
        result.destination.index,
        0,
        draggedCourses
    );

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

    setCurrentSemester(newSemester);
    setCurrentPlan(newPlan);
    setPlans(newPlans);
}

function handleCourse2Semester({
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

    const draggedCourse = coursePool[result.source.index];
    const reorderedSemesterCourses = [...semesterPool];
    reorderedSemesterCourses.splice(result.destination.index, 0, draggedCourse);

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

    setCurrentSemester(newSemester);
    setCurrentPlan(newPlan);
    setPlans(newPlans);
    setCoursePool(
        coursePool.filter(
            (course: Course): boolean => course.code !== draggedCourse.code
        )
    );
}

function handleSemester2Course({
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

    const reorderedSemesterCourses = [...semesterPool];
    reorderedSemesterCourses.splice(result.source.index, 1);

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
