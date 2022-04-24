import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { Course } from "../../../interfaces/course";
import { InfoModalView } from "./InfoModalView";

type CourseEditModalProps = {
    showCourseEditor: boolean;
    setShowCourseEditor: (newVal: boolean) => void;
    currentCourse: Course;
    courseList: Course[];
    setCourseList: (newCourses: Course[]) => void;
};

export function CourseModal({
    showCourseEditor,
    setShowCourseEditor,
    currentCourse,
    courseList,
    setCourseList
}: CourseEditModalProps): JSX.Element {
    const [courseModalMode, setCourseModalMode] = useState<string>("info");

    return (
        <Modal
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
                ""
            )}
        </Modal>
    );
}
