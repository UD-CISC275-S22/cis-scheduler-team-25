import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { Course } from "../../../interfaces/course";

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
    const handleClose = () => setShowCourseEditor(false);

    const [courseModalMode, setCourseModalMode] = useState<string>("view");

    return (
        <Modal show={showCourseEditor} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Edit Course Information for {currentCourse.code}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>Sample Sentence</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
