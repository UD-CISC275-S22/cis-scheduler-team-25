import React from "react";
import { Modal } from "react-bootstrap";

export function HelpSemesterView() {
    return (
        <Modal.Body>
            {" "}
            When a semester is selected and viewed, you will be brought to a
            Course Drag and Drop. You can select courses from a pool of courses
            on the right hand side of the screen, where you can drag courses
            into your semester on the left hand side.
        </Modal.Body>
    );
}
