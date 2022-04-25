import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Course } from "../../../interfaces/course";
import "../../components.css";

type EditModalViewProps = {
    currentCourse: Course;
    setShowCourseEditor: (newVal: boolean) => void;
    setCourseModalMode: (newMode: string) => void;
    courseList: Course[];
    setCourseList: (newCourses: Course[]) => void;
};

export function EditModalView({
    currentCourse,
    setShowCourseEditor,
    setCourseModalMode
}: // courseList,
// setCourseList
EditModalViewProps): JSX.Element {
    const [name, setName] = useState<string>(currentCourse.name);
    const [descr, setDescr] = useState<string>(currentCourse.descr);
    const [credits, setCredits] = useState<string>(currentCourse.credits);
    const [preReqs, setPreReqs] = useState<string>(
        currentCourse.preReqs
            .map((reqGroup: string[]): string => reqGroup.join(","))
            .join("\n")
    );
    const [degreeRequirement, setDegreeRequirement] = useState<string>(
        currentCourse.degreeRequirement.join("\n")
    );

    function updateName(event: React.ChangeEvent<HTMLInputElement>) {
        setName(event.target.value.trim());
    }

    function updateDescr(event: React.ChangeEvent<HTMLInputElement>) {
        setDescr(event.target.value.trim());
    }

    function updateCredits(event: React.ChangeEvent<HTMLInputElement>) {
        setCredits(event.target.value.trim());
    }

    function updatePreReqs(event: React.ChangeEvent<HTMLInputElement>) {
        setPreReqs(event.target.value);
    }

    function updateDegreeRequirement(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        setDegreeRequirement(event.target.value);
    }

    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>
                    <strong>EDIT</strong> Course Information for{" "}
                    {currentCourse.code}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId="form-course-name">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control value={name} onChange={updateName} />
                </Form.Group>
                <Form.Group controlId="form-course-descr">
                    <Form.Label>Course Description:</Form.Label>
                    <Form.Control
                        type="number"
                        value={descr}
                        onChange={updateDescr}
                    />
                </Form.Group>
                <Form.Group controlId="form-course-credits">
                    <Form.Label>Credits:</Form.Label>
                    <Form.Control value={credits} onChange={updateCredits} />
                </Form.Group>
                <Form.Group controlId="form-course-preReqs">
                    <Form.Label>Course Prerequesites:</Form.Label>
                    <Form.Control
                        value={preReqs}
                        onChange={updatePreReqs}
                        as="textarea"
                        rows={5}
                    />
                </Form.Group>
                <Form.Group controlId="form-course-degreeRequirement">
                    <Form.Label>Degree Requirements:</Form.Label>
                    <Form.Control
                        value={degreeRequirement}
                        onChange={updateDegreeRequirement}
                        as="textarea"
                        rows={5}
                    />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="primary"
                    onClick={() => setCourseModalMode("info")}
                >
                    Save Changes
                </Button>
                <Button
                    variant="primary"
                    onClick={() => setCourseModalMode("info")}
                >
                    Cancel Changes
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
