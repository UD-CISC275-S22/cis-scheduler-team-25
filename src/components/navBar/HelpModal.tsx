import React from "react";
import { Modal, Button } from "react-bootstrap";
import { HelpIntroView } from "./HelpIntroView";
import { HelpPlanView } from "./HelpPlanView";
import { HelpMainView } from "./HelpMainView";
import { HelpSemesterView } from "./HelpSemesterView";
import { HelpCourseModalView } from "./HelpCourseModalView";

function getModalBody(helpMode: string): JSX.Element {
    switch (helpMode) {
        case "Introduction":
            return <HelpIntroView />;
        case "Managing Your Degree Plans":
            return <HelpMainView />;
        case "Selecting Semesters in a Plan":
            return <HelpPlanView />;
        case "Editing Semesters with Course Drag and Drop":
            return <HelpSemesterView />;
        case "Using the Course Viewer, Editor, and Transfer":
            return <HelpCourseModalView />;
        default:
            return <HelpIntroView />;
    }
}

export function HelpModal({
    helpMode,
    showModal,
    setShowModal
}: {
    helpMode: string;
    showModal: boolean;
    setShowModal: (newState: boolean) => void;
}): JSX.Element {
    function handleClose() {
        setShowModal(false);
    }

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{helpMode}</Modal.Title>
            </Modal.Header>
            {getModalBody(helpMode)}
            <Modal.Footer>
                <Button
                    variant="secondary"
                    data-testid="help-close-button"
                    onClick={handleClose}
                >
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
