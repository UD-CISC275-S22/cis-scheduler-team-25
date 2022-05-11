import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Course } from "../../../interfaces/course";
import { InfoModalView } from "./InfoModalView";
import { EditModalView } from "./EditModalView";
import { TransferModalView } from "./TransferModalView";

type CourseEditModalProps = {
    showCourseEditor: boolean;
    setShowCourseEditor: (newVal: boolean) => void;
    currentCourse: Course;
    setCurrentCourse: (newCourse: Course) => void;
    courseList: Course[];
    setCourseList: (newCourses: Course[]) => void;
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
    setCoursePool,
    category,
    requirement
}: CourseEditModalProps): JSX.Element {
    const [courseModalMode, setCourseModalMode] = useState<string>("info");

    const getView = () => {
        switch (courseModalMode) {
            case "edit":
                return (
                    <EditModalView
                        currentCourse={currentCourse}
                        setCurrentCourse={setCurrentCourse}
                        setShowCourseEditor={setShowCourseEditor}
                        setCourseModalMode={setCourseModalMode}
                        courseList={courseList}
                        setCourseList={setCourseList}
                        setCoursePool={setCoursePool}
                        category={category}
                        requirement={requirement}
                    />
                );
            case "transfer":
                return (
                    <TransferModalView
                        currentCourse={currentCourse}
                        setShowCourseEditor={setShowCourseEditor}
                        setCourseModalMode={setCourseModalMode}
                    />
                );
            default:
                return (
                    <InfoModalView
                        currentCourse={currentCourse}
                        setShowCourseEditor={setShowCourseEditor}
                        setCourseModalMode={setCourseModalMode}
                    />
                );
        }
    };

    return (
        <Modal
            data-testid="courseModal"
            size="lg"
            centered
            show={showCourseEditor}
            onHide={() => {
                setShowCourseEditor(false);
                setCourseModalMode("info");
            }}
        >
            {getView()}
        </Modal>
    );
}
