import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Course } from "../../../interfaces/course";
import { InfoModalView } from "./InfoModalView";
import { EditModalView } from "./EditModalView";
import { Semester } from "../../../interfaces/semester";
import { DegreePlan } from "../../../interfaces/degreeplan";

type CourseEditModalProps = {
    showCourseEditor: boolean;
    setShowCourseEditor: (newVal: boolean) => void;
    currentCourse: Course;
    setCurrentCourse: (newCourse: Course) => void;
    courseList: Course[];
    setCourseList: (newCourses: Course[]) => void;
    currentSemester: Semester;
    setCurrentSemester: (newSemester: Semester) => void;
    currentPlan: DegreePlan;
    setCurrentPlan: (newPlan: DegreePlan) => void;
    plans: DegreePlan[];
    setPlans: (newPlans: DegreePlan[]) => void;
    setCoursePool: (newCourses: Course[]) => void;
    category: string;
    requirement: string;
};

export function CourseModal({
    showCourseEditor,
    setShowCourseEditor,
    currentCourse,
    setCurrentCourse,
    courseList,
    setCourseList,
    currentSemester,
    setCurrentSemester,
    currentPlan,
    setCurrentPlan,
    plans,
    setPlans,
    setCoursePool,
    category,
    requirement
}: CourseEditModalProps): JSX.Element {
    const [courseModalMode, setCourseModalMode] = useState<string>("info");

    return (
        <Modal
            data-testid="courseModal"
            size="lg"
            centered
            show={showCourseEditor}
            onHide={() => setShowCourseEditor(false)}
        >
            {courseModalMode == "info" ? (
                <InfoModalView
                    currentCourse={currentCourse}
                    setShowCourseEditor={setShowCourseEditor}
                    setCourseModalMode={setCourseModalMode}
                />
            ) : (
                <EditModalView
                    currentCourse={currentCourse}
                    setCurrentCourse={setCurrentCourse}
                    setShowCourseEditor={setShowCourseEditor}
                    setCourseModalMode={setCourseModalMode}
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
            )}
        </Modal>
    );
}
