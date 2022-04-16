import React from "react";
import { DropResult } from "react-beautiful-dnd";
import { Course } from "../../interfaces/course";
import { Semester } from "../../interfaces/semester";

type DragEndProps = {
    result: DropResult;
    coursePool: Course[];
    semesterPool: Course[];
    currentSemester: Semester;
    setCurrentSemester: (newSemester: Semester) => void;
    setCoursePool: (newCoursePool: Course[]) => void;
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
        setCurrentSemester({
            ...currentSemester,
            courses: reorderedSemesterCourses
        });
    } else if (action === "coursePool->semesterPool") {
        console.log("asdas");
    } else if (action === "semesterPool->coursePool") {
        console.log("asdas");
    }
}
