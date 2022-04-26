import React, { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Row, Col } from "react-bootstrap";
import { Course } from "../../interfaces/course";
import { Semester } from "../../interfaces/semester";
import { CourseDropPool } from "./CourseDropPool";
import { handleOnDragEnd } from "./handleOnDragEnd";
import { DegreePlan } from "../../interfaces/degreeplan";
import { RequirementSelector } from "./RequirementSelector";
import { AlertMessage } from "./AlertMessage";
import INVALID_COURSE from "../../exampleData/invalid_course.json";
import { CourseModal } from "./courseModal/CourseModal";

type CourseDragDropProps = {
    currentSemester: Semester;
    setCurrentSemester: (newSemester: Semester) => void;
    plans: DegreePlan[];
    setPlans: (newPlans: DegreePlan[]) => void;
    currentPlan: DegreePlan;
    setCurrentPlan: (newPlan: DegreePlan) => void;
    courseList: Course[];
    setCourseList: (newCourses: Course[]) => void;
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
    setCurrentPlan,
    courseList,
    setCourseList
}: CourseDragDropProps): JSX.Element {
    // state for selecting what Degree Requirement you want to choose from
    const [requirement, setRequirement] = useState<string>("CISC Core");

    // state for selecting what Category of degree requirements you want to choose from
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

    // states for handling an action's status and whether or not the status displays
    const [status, setStatus] = useState<string>("");
    const [alertActive, setAlertActive] = useState<boolean>(false);

    // state
    const [showCourseEditor, setShowCourseEditor] = useState<boolean>(false);
    const [currentCourse, setCurrentCourse] = useState<Course>(INVALID_COURSE);

    return (
        <div>
            <CourseModal
                showCourseEditor={showCourseEditor}
                setShowCourseEditor={setShowCourseEditor}
                currentCourse={currentCourse}
                setCurrentCourse={setCurrentCourse}
                courseList={courseList}
                setCourseList={setCourseList}
                setCurrentSemester={setCurrentSemester}
                setCurrentPlan={setCurrentPlan}
                currentPlan={currentPlan}
                currentSemester={currentSemester}
                setPlans={setPlans}
                plans={plans}
                setCoursePool={setCoursePool}
                category={category}
                requirement={requirement}
            />
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
                        setCurrentPlan: setCurrentPlan,
                        setStatus: setStatus,
                        setAlertActive: setAlertActive,
                        courseList: courseList
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
                        <AlertMessage
                            alertActive={alertActive}
                            setAlertActive={setAlertActive}
                            status={status}
                        />
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
                            courseList={courseList}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p>Current Course Schedule</p>
                        <CourseDropPool
                            courses={currentSemester.courses}
                            droppableId="semesterPool"
                            setShowCourseEditor={setShowCourseEditor}
                            setCurrentCourse={setCurrentCourse}
                        />
                    </Col>
                    <Col>
                        <p>Potential Courses</p>
                        <CourseDropPool
                            courses={coursePool}
                            droppableId="coursePool"
                            setShowCourseEditor={setShowCourseEditor}
                            setCurrentCourse={setCurrentCourse}
                        />
                    </Col>
                </Row>
            </DragDropContext>
        </div>
    );
}
