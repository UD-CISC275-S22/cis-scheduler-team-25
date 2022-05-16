import React from "react";
import { Button, Modal } from "react-bootstrap";

export function SaveModal({
    showModal,
    setShowModal
}: {
    showModal: boolean;
    setShowModal: (newState: boolean) => void;
}): JSX.Element {
    function handleClose() {
        setShowModal(false);
    }

    return (
        <Modal show={showModal} onHide={handleClose} data-testid="saveModal">
            <Modal.Header closeButton>
                <Modal.Title>Save Status</Modal.Title>
            </Modal.Header>
            <Modal.Body>Your plans have been successfully saved!</Modal.Body>
            <Modal.Footer>
                <Button
                    variant="secondary"
                    data-testid="save-close-button"
                    onClick={handleClose}
                >
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
