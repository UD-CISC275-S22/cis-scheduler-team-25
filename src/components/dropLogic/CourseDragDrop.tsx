import React, { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Row, Col } from "react-bootstrap";
import { Course } from "../../interfaces/course";
import { CourseDropPool } from "./CourseDropPool";
import { handleOnDragEnd, getUnusedCourses } from "./utils/dragUtils";
import { RequirementSelector } from "./RequirementSelector";
import { AlertMessage } from "./AlertMessage";
import INVALID_COURSE from "../../data/invalid_course.json";
import { CourseModal } from "./courseModal/CourseModal";
import { RemoveAllCoursesButton } from "../semesterComponents/RemoveAllCoursesButton";
import { usePlanContext } from "../context/PlanContext";
import { CourseAutoComplete } from "./CourseAutoComplete";

type CourseDragDropProps = {
    courseList: Course[];
    setCourseList: (newCourses: Course[]) => void;
};

/*
Component allowing for courses to be dragged and dropped from a pool of courses
to add to a selected semester. Organized into rows and columns

Semester load is also displayed as credit total
*/
export function CourseDragDrop({
    courseList,
    setCourseList
}: CourseDragDropProps): JSX.Element {
    const {
        plans,
        setPlans,
        currentPlan,
        setCurrentPlan,
        currentSemester,
        setCurrentSemester
    } = usePlanContext();

    // state for selecting what Degree Requirement you want to choose from
    const [requirement, setRequirement] = useState<string>("CISC Core");

    // state for selecting what Category of degree requirements you want to choose from
    const [category, setCategory] = useState<string>("General");

    // state for the set of courses available for dragging into your currentSemester
    const [coursePool, setCoursePool] = useState<Course[]>(
        getUnusedCourses(
            currentPlan,
            currentSemester,
            courseList,
            category + "-" + requirement
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
                setCoursePool={setCoursePool}
                category={category}
                requirement={requirement}
            />
            <DragDropContext
                onDragEnd={(result: DropResult) =>
                    handleOnDragEnd({
                        reqFilter: category + "-" + requirement,
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
                <br></br>
                <Row>
                    <Col>
                        <div>
                            <p>
                                <strong>Semester Load:</strong>
                            </p>
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
                        <p>
                            <strong>Please select a requirement</strong>
                        </p>
                        <RequirementSelector
                            category={category}
                            setCategory={setCategory}
                            requirement={requirement}
                            setRequirement={setRequirement}
                            setCoursePool={setCoursePool}
                            courseList={courseList}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p>
                            <strong>Current Course Schedule</strong>
                        </p>
                        <CourseDropPool
                            courses={currentSemester.courses}
                            droppableId="semesterPool"
                            setShowCourseEditor={setShowCourseEditor}
                            setCurrentCourse={setCurrentCourse}
                        />
                    </Col>
                    <Col>
                        <p>
                            <strong>Potential Courses</strong>
                        </p>
                        <CourseDropPool
                            courses={coursePool}
                            droppableId="coursePool"
                            setShowCourseEditor={setShowCourseEditor}
                            setCurrentCourse={setCurrentCourse}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <br></br>
                        <br></br>
                        <br></br>
                        <RemoveAllCoursesButton
                            courseList={courseList}
                            setCoursePool={setCoursePool}
                            requirement={requirement}
                            category={category}
                        ></RemoveAllCoursesButton>
                    </Col>
                    <Col>
                        <CourseAutoComplete
                            setCurrentCourse={setCurrentCourse}
                            courseList={courseList}
                            setCourseList={setCourseList}
                            setCoursePool={setCoursePool}
                            category={category}
                            requirement={requirement}
                            setStatus={setStatus}
                            setAlertActive={setAlertActive}
                        />
                    </Col>
                </Row>
            </DragDropContext>
        </div>
    );
}
