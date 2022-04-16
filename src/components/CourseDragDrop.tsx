import React, { useState } from "react";
import {
    DragDropContext,
    Droppable,
    Draggable,
    DroppableProvided,
    DropResult
} from "react-beautiful-dnd";
import { Row, Col } from "react-bootstrap";
import { Course } from "../interfaces/course";
import { Semester } from "../interfaces/semester";
import { CourseDropPool } from "./CourseDropPool";

type CourseDragDropProps = {
    courses: Course[];
    currentSemester: Semester;
    setCurrentSemester: (newSemester: Semester) => void;
};

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
function handleOnDragEnd({
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

/* Component allowing for courses to be dragged and dropped from a pool of courses
   to add to a selected semester
*/
export function CourseDragDrop({
    courses,
    currentSemester,
    setCurrentSemester
}: CourseDragDropProps): JSX.Element {
    const [coursePool, setCoursePool] = useState<Course[]>(
        courses.filter(
            (course: Course): boolean =>
                !currentSemester.courses.includes(course)
        )
    );

    return (
        <div>
            <DragDropContext
                onDragEnd={(result: DropResult) =>
                    handleOnDragEnd({
                        result: result,
                        coursePool: coursePool,
                        semesterPool: currentSemester.courses,
                        currentSemester: currentSemester,
                        setCurrentSemester: setCurrentSemester,
                        setCoursePool: setCoursePool
                    })
                }
            >
                <Row>
                    <Col>
                        <CourseDropPool
                            courses={coursePool}
                            droppableId="coursePool"
                        />
                    </Col>
                    <Col>
                        <CourseDropPool
                            courses={currentSemester.courses}
                            droppableId="semesterPool"
                        />
                    </Col>
                </Row>
            </DragDropContext>
        </div>
    );
}
