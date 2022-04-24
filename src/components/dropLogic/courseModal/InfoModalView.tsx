import React from "react";
import { Modal } from "react-bootstrap";
import { Course } from "../../../interfaces/course";
import "../../components.css";

type InfoModalViewProps = {
    currentCourse: Course;
};

export function InfoModalView({
    currentCourse
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
                    <i>Restrictions</i>
                    <p></p>
                    <div>{currentCourse.preReqDesc}</div>
                    <div>{currentCourse.restrict}</div>
                </div>
                <div className="modal-section">
                    <i>Other Information</i>
                    <p></p>
                    <div>{currentCourse.breadth}</div>
                    <div>{currentCourse.typ}</div>
                </div>
            </Modal.Body>
        </>
    );
}
