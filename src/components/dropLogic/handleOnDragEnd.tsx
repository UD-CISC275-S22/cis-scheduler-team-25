import React from "react";
import { DropResult } from "react-beautiful-dnd";
import { Course } from "../../interfaces/course";
import { DegreePlan } from "../../interfaces/degreeplan";
import { Semester } from "../../interfaces/semester";

type DragEndProps = {
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

/* Function for handling the drag/drop updating logic
   the action string provides information about where a course is being dragged
   to, i.e. dragged from the coursePool or semester schedule
   States for the currentSemester's courses array and the coursePool itself are updated
*/
export function handleOnDragEnd({
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
    const action =
        result.source.droppableId.toString() +
        "->" +
        result.destination.droppableId.toString();
    if (action === "semesterPool->semesterPool") {
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

        setCurrentSemester({
            ...currentSemester,
            courses: reorderedSemesterCourses
        });
        setCurrentPlan(newPlan);
        setPlans(
            plans.map(
                (plan: DegreePlan): DegreePlan =>
                    plan.id === currentPlan.id ? newPlan : plan
            )
        );
    } else if (action === "coursePool->semesterPool") {
        console.log("asdas");
    } else if (action === "semesterPool->coursePool") {
        console.log("asdas");
    }
}
