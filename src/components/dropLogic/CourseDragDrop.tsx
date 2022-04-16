import React, { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Row, Col } from "react-bootstrap";
import { Course } from "../../interfaces/course";
import { Semester } from "../../interfaces/semester";
import { CourseDropPool } from "./CourseDropPool";
import { courseList } from "../ReadJSON";
import { handleOnDragEnd } from "./handleOnDragEnd";

type CourseDragDropProps = {
    currentSemester: Semester;
    setCurrentSemester: (newSemester: Semester) => void;
};

/* Component allowing for courses to be dragged and dropped from a pool of courses
   to add to a selected semester
*/
export function CourseDragDrop({
    currentSemester,
    setCurrentSemester
}: CourseDragDropProps): JSX.Element {
    const [coursePool, setCoursePool] = useState<Course[]>(
        courseList.filter(
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
                            courses={currentSemester.courses}
                            droppableId="semesterPool"
                        />
                    </Col>
                    <Col>
                        {" "}
                        <CourseDropPool
                            courses={coursePool.slice(0, 10)}
                            droppableId="coursePool"
                        />
                    </Col>
                </Row>
            </DragDropContext>
        </div>
    );
}
