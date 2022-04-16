import React, { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Row, Col } from "react-bootstrap";
import { Course } from "../../interfaces/course";
import { Semester } from "../../interfaces/semester";
import { CourseDropPool } from "./CourseDropPool";
import { courseList } from "../ReadJSON";
import { handleOnDragEnd } from "./handleOnDragEnd";
import { DegreePlan } from "../../interfaces/degreeplan";

type CourseDragDropProps = {
    currentSemester: Semester;
    setCurrentSemester: (newSemester: Semester) => void;
    plans: DegreePlan[];
    setPlans: (newPlans: DegreePlan[]) => void;
    currentPlan: DegreePlan;
    setCurrentPlan: (newPlan: DegreePlan) => void;
};

/* Component allowing for courses to be dragged and dropped from a pool of courses
   to add to a selected semester
*/
export function CourseDragDrop({
    currentSemester,
    setCurrentSemester,
    plans,
    setPlans,
    currentPlan,
    setCurrentPlan
}: CourseDragDropProps): JSX.Element {
    const [category, setCategory] = useState<string>("CISC Core");
    const [coursePool, setCoursePool] = useState<Course[]>(
        courseList.filter(
            (course: Course): boolean =>
                !currentSemester.courses.includes(course)
        )
    );
    const [currentCourses, setcurrentCourses] = useState<Course[]>(
        coursePool.filter((course: Course): boolean =>
            course.degreeCategory.includes(category)
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
                        setCoursePool: setCoursePool,
                        plans: plans,
                        setPlans: setPlans,
                        currentPlan: currentPlan,
                        setCurrentPlan: setCurrentPlan
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
                            courses={currentCourses}
                            droppableId="coursePool"
                        />
                    </Col>
                </Row>
            </DragDropContext>
        </div>
    );
}
