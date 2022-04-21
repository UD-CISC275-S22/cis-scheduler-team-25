import React, { useState } from "react";
import { DegreePlan } from "../interfaces/degreeplan";
import { Button, Modal } from "react-bootstrap";
import "./components.css";

export function ViewProgress(): JSX.Element {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                View Degree Progress
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Degree Progress</Modal.Title>
                </Modal.Header>
                <Modal.Body>Your progress will appear here.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
