import React from "react";
import { Button, Modal } from "react-bootstrap";
import { Course } from "../../../interfaces/course";
import "../../components.css";

type InfoModalViewProps = {
    currentCourse: Course;
    setShowCourseEditor: (newVal: boolean) => void;
    setCourseModalMode: (newMode: string) => void;
};

// View that displays the course's general information
export function InfoModalView({
    currentCourse,
    setShowCourseEditor,
    setCourseModalMode
}: InfoModalViewProps): JSX.Element {
    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>
                    Course Information for {currentCourse.code}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="modal-section">
                    <div>
                        <strong>
                            {currentCourse.code + " - " + currentCourse.name}
                        </strong>
                    </div>
                    <div>{"Credits: (" + currentCourse.credits + ")"}</div>
                </div>
                <div className="modal-section">
                    <p>
                        <strong>Constraints</strong>
                    </p>
                    <p>
                        <i>Prerequisites</i>
                    </p>
                    <p>
                        {currentCourse.preReqs
                            .map((reqGroup: string[]): string =>
                                reqGroup.join(" or ")
                            )
                            .join(", ")}
                    </p>
                    <p>{currentCourse.preReqDesc}</p>
                    <p>
                        <i>Restrictions</i>
                    </p>
                    <p>{currentCourse.restrict}</p>
                </div>
                <div className="modal-section">
                    <p>
                        <strong>Other Information</strong>
                    </p>
                    <p>
                        <i>Breadth Description</i>
                    </p>
                    <p>{currentCourse.breadth}</p>
                    <p>
                        <i>Availability</i>
                    </p>
                    <p>{currentCourse.typ}</p>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="primary"
                    onClick={() => setCourseModalMode("edit")}
                >
                    Edit Information
                </Button>
                <Button
                    variant="secondary"
                    onClick={() => setShowCourseEditor(false)}
                >
                    Close
                </Button>
            </Modal.Footer>
        </>
    );
}
