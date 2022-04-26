import React, { useState } from "react";
import { DegreePlan } from "../interfaces/degreeplan";
import { Button, Modal } from "react-bootstrap";
import "./components.css";
import { ProgressList } from "./ProgressList";

export function ViewProgress(): JSX.Element {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                View Degree Progress
            </Button>

            <Modal size="lg" show={show} onHide={handleClose}>
                <Modal.Header className="modal" closeButton>
                    <Modal.Title>Degree Progress</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal">
                    <ProgressList />
                </Modal.Body>
                <Modal.Footer className="modal">
                    <Button variant="primary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
