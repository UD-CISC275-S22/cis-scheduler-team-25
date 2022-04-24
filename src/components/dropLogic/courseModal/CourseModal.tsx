import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { Course } from "../../../interfaces/course";
import { InfoModalView } from "./InfoModalView";

type CourseEditModalProps = {
    showCourseEditor: boolean;
    setShowCourseEditor: (newVal: boolean) => void;
    currentCourse: Course;
};

export function CourseModal({
    showCourseEditor,
    setShowCourseEditor,
    currentCourse
}: CourseEditModalProps): JSX.Element {
    const [courseModalMode, setCourseModalMode] = useState<string>("info");

    const handleClose = () => setShowCourseEditor(false);

    return (
        <Modal show={showCourseEditor} onHide={handleClose}>
            {courseModalMode == "info" ? (
                <InfoModalView currentCourse={currentCourse} />
            ) : (
                ""
            )}
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    {courseModalMode == "info"
                        ? "Edit Information"
                        : "Save Changes"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
