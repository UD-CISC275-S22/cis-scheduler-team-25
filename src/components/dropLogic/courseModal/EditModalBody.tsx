import React from "react";
import { Form, Modal } from "react-bootstrap";
import { EditableCourse } from "../../../interfaces/editable_course";
import degreeCategoriesData from "../../../exampleData/degree_categories.json";

type EditModalBodyProps = {
    editCourse: EditableCourse;
    setEditCourse: (newCourse: EditableCourse) => void;
};

const degreeCategories = degreeCategoriesData as Record<string, string[]>;

export function EditModalBody({
    editCourse,
    setEditCourse
}: EditModalBodyProps) {
    function updateDegreeRequirement(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        const checkedReq = event.target.value;
        if (editCourse.degreeRequirement.includes(checkedReq)) {
            setEditCourse({
                ...editCourse,
                degreeRequirement: editCourse.degreeRequirement.filter(
                    (req: string): boolean => req !== checkedReq
                )
            });
        } else {
            setEditCourse({
                ...editCourse,
                degreeRequirement: [...editCourse.degreeRequirement, checkedReq]
            });
        }
    }

    return (
        <Modal.Body>
            <Form.Group controlId="form-course-name">
                <Form.Label>Name:</Form.Label>
                <Form.Control
                    value={editCourse.name}
                    onChange={(e) =>
                        setEditCourse({
                            ...editCourse,
                            name: e.target.value
                        })
                    }
                />
            </Form.Group>
            <p></p>
            <Form.Group controlId="form-course-descr">
                <Form.Label>Course Description:</Form.Label>
                <Form.Control
                    value={editCourse.descr}
                    onChange={(e) =>
                        setEditCourse({
                            ...editCourse,
                            descr: e.target.value
                        })
                    }
                    as="textarea"
                    rows={3}
                />
            </Form.Group>
            <p></p>
            <Form.Group controlId="form-course-credits">
                <Form.Label>Credits:</Form.Label>
                <Form.Control
                    type="number"
                    value={parseInt(editCourse.credits)}
                    onChange={(e) =>
                        setEditCourse({
                            ...editCourse,
                            credits: e.target.value
                        })
                    }
                />
            </Form.Group>
            <p></p>
            <Form.Group controlId="form-course-preReqs">
                <Form.Label>Course Prerequesites:</Form.Label>
                <Form.Control
                    value={editCourse.preReqs}
                    onChange={(e) =>
                        setEditCourse({
                            ...editCourse,
                            preReqs: e.target.value
                        })
                    }
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
                                        checked={editCourse.degreeRequirement.includes(
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
    );
}
