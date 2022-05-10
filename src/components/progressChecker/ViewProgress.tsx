import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "../components.css";
import { ProgressList } from "./ProgressList";
import { usePlanContext } from "../context/PlanContext";

export function ViewProgress(): JSX.Element {
    const [show, setShow] = useState(false);
    const { currentPlan } = usePlanContext();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button
                variant="primary"
                data-testid="view-progress-button"
                onClick={handleShow}
            >
                View Degree Progress
            </Button>

            <Modal
                data-testid="progress-modal"
                size="lg"
                show={show}
                onHide={handleClose}
            >
                <Modal.Header className="modalHead">
                    <Modal.Title>Degree Progress</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ProgressList currentPlan={currentPlan} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
