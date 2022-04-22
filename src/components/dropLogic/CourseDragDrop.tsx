import React, { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Row, Col } from "react-bootstrap";
import { Course } from "../../interfaces/course";
import { Semester } from "../../interfaces/semester";
import { CourseDropPool } from "./CourseDropPool";
import { courseList } from "../ReadJSON";
import { handleOnDragEnd } from "./handleOnDragEnd";
import { DegreePlan } from "../../interfaces/degreeplan";
import { RequirementSelector } from "./RequirementSelector";

type CourseDragDropProps = {
    currentSemester: Semester;
    setCurrentSemester: (newSemester: Semester) => void;
    plans: DegreePlan[];
    setPlans: (newPlans: DegreePlan[]) => void;
    currentPlan: DegreePlan;
    setCurrentPlan: (newPlan: DegreePlan) => void;
};

/*
Component allowing for courses to be dragged and dropped from a pool of courses
to add to a selected semester. Organized into rows and columns

Semester load is also displayed as credit total
*/
export function CourseDragDrop({
    currentSemester,
    setCurrentSemester,
    plans,
    setPlans,
    currentPlan,
    setCurrentPlan
}: CourseDragDropProps): JSX.Element {
    // state for selecting what Degree Requirement requirement you want to choose from
    const [requirement, setRequirement] = useState<string>("CISC Core");
    const [category, setCategory] = useState<string>("General");

    // state for the set of courses available for dragging into your currentSemester
    const [coursePool, setCoursePool] = useState<Course[]>(
        courseList.filter(
            (course: Course): boolean =>
                !currentSemester.courses
                    .map((currCourse: Course): string => currCourse.code)
                    .includes(course.code) &&
                course.degreeRequirement.includes(category + "-" + requirement)
        )
    );

    return (
        <div>
            <DragDropContext
                onDragEnd={(result: DropResult) =>
                    handleOnDragEnd({
                        category: category,
                        requirement: requirement,
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
                        <div>
                            <p>Semester Load:</p>
                            <p>
                                {currentSemester.courses
                                    .reduce(
                                        (credits: number, course: Course) =>
                                            credits + parseInt(course.credits),
                                        0
                                    )
                                    .toString() + " Credits"}
                            </p>
                        </div>
                    </Col>
                    <Col>
                        {" "}
                        <RequirementSelector
                            category={category}
                            setCategory={setCategory}
                            currentPlan={currentPlan}
                            requirement={requirement}
                            setRequirement={setRequirement}
                            setCoursePool={setCoursePool}
                            currentSemester={currentSemester}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p>Current Course Schedule</p>
                        <CourseDropPool
                            courses={currentSemester.courses}
                            droppableId="semesterPool"
                        />
                    </Col>
                    <Col>
                        <p>Potential Courses</p>
                        <CourseDropPool
                            courses={coursePool}
                            droppableId="coursePool"
                        />
                    </Col>
                </Row>
            </DragDropContext>
        </div>
    );
}
