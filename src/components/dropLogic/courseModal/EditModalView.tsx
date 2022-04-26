import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Course } from "../../../interfaces/course";
import { saveChanges, checkValidFields } from "./courseEditValidation";
import degreeCategoriesData from "../../../exampleData/degree_categories.json";
import "../../components.css";

type EditModalViewProps = {
    currentCourse: Course;
    setShowCourseEditor: (newVal: boolean) => void;
    setCourseModalMode: (newMode: string) => void;
    courseList: Course[];
    setCourseList: (newCourses: Course[]) => void;
};

const degreeCategories = degreeCategoriesData as Record<string, string[]>;

export function EditModalView({
    currentCourse,
    setShowCourseEditor,
    setCourseModalMode,
    courseList,
    setCourseList
}: EditModalViewProps): JSX.Element {
    const [name, setName] = useState<string>(currentCourse.name);
    const [descr, setDescr] = useState<string>(currentCourse.descr);
    const [credits, setCredits] = useState<string>(currentCourse.credits);
    const [preReqs, setPreReqs] = useState<string>(
        currentCourse.preReqs
            .map((reqGroup: string[]): string => reqGroup.join(","))
            .join("\n")
    );
    const [degreeRequirement, setDegreeRequirement] = useState<string[]>(
        currentCourse.degreeRequirement
    );

    function updateName(event: React.ChangeEvent<HTMLInputElement>) {
        setName(event.target.value);
    }

    function updateDescr(event: React.ChangeEvent<HTMLInputElement>) {
        setDescr(event.target.value);
    }

    function updateCredits(event: React.ChangeEvent<HTMLInputElement>) {
        setCredits(event.target.value);
    }

    function updatePreReqs(event: React.ChangeEvent<HTMLInputElement>) {
        setPreReqs(event.target.value);
    }

    function updateDegreeRequirement(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        const checkedReq = event.target.value;
        if (degreeRequirement.includes(checkedReq)) {
            setDegreeRequirement(
                degreeRequirement.filter(
                    (req: string): boolean => req !== checkedReq
                )
            );
        } else {
            setDegreeRequirement([...degreeRequirement, checkedReq]);
        }
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
                <p></p>
                <Form.Group controlId="form-course-descr">
                    <Form.Label>Course Description:</Form.Label>
                    <Form.Control
                        value={descr}
                        onChange={updateDescr}
                        as="textarea"
                        rows={3}
                    />
                </Form.Group>
                <p></p>
                <Form.Group controlId="form-course-credits">
                    <Form.Label>Credits:</Form.Label>
                    <Form.Control
                        type="number"
                        value={parseInt(credits)}
                        onChange={updateCredits}
                    />
                </Form.Group>
                <p></p>
                <Form.Group controlId="form-course-preReqs">
                    <Form.Label>Course Prerequesites:</Form.Label>
                    <Form.Control
                        value={preReqs}
                        onChange={updatePreReqs}
                        as="textarea"
                        rows={5}
                    />
                </Form.Group>
                <p></p>
                <Form.Group controlId="form-course-degreeRequirement">
                    <Form.Label>Degree Requirements:</Form.Label>
                    {Object.keys(degreeCategories).map(
                        (category: string): JSX.Element => (
                            <div key={category}>
                                <Form.Label>
                                    <i>{category}:</i>
                                </Form.Label>
                                <p></p>
                                {degreeCategories[category].map(
                                    (req: string): JSX.Element => (
                                        <Form.Check
                                            inline
                                            key={category + "-" + req}
                                            label={req}
                                            value={category + "-" + req}
                                            checked={degreeRequirement.includes(
                                                category + "-" + req
                                            )}
                                            onChange={updateDegreeRequirement}
                                        />
                                    )
                                )}
                                <p></p>
                            </div>
                        )
                    )}
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="primary"
                    disabled={
                        !checkValidFields(
                            name,
                            descr,
                            credits,
                            preReqs,
                            degreeRequirement
                        )
                    }
                    onClick={() =>
                        saveChanges(
                            name,
                            descr,
                            credits,
                            preReqs,
                            degreeRequirement,
                            currentCourse,
                            courseList,
                            setCourseList
                        )
                    }
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
