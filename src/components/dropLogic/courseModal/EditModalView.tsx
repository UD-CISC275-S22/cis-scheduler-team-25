import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { Course } from "../../../interfaces/course";

type EditModalViewProps = {
    currentCourse: Course;
};

export function EditModalView({
    currentCourse
}: EditModalViewProps): JSX.Element {
    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>
                    Edit Course Information for {currentCourse.code}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>Sample Sentence</Modal.Body>
        </>
    );
}
