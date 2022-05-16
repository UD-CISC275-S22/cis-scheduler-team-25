import React, { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { EditableCourse } from "../../../interfaces/editable_course";
import degreeCategoriesData from "../../../data/degree_categories.json";

type EditModalBodyProps = {
    editCourse: EditableCourse;
    setEditCourse: (newCourse: EditableCourse) => void;
};

const degreeCategories = degreeCategoriesData as Record<string, string[]>;
const categories = Object.keys(degreeCategories);

export function EditModalBody({
    editCourse,
    setEditCourse
}: EditModalBodyProps) {
    const [checkboxCategory, setCheckboxCategory] = useState<string>(
        categories[0]
    );

    function updatedegreeRequirements(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        const checkedReq = event.target.value;
        if (editCourse.degreeRequirements.includes(checkedReq)) {
            setEditCourse({
                ...editCourse,
                degreeRequirements: editCourse.degreeRequirements.filter(
                    (req: string): boolean => req !== checkedReq
                )
            });
        } else {
            setEditCourse({
                ...editCourse,
                degreeRequirements: [
                    ...editCourse.degreeRequirements,
                    checkedReq
                ]
            });
        }
    }

    return (
        <Modal.Body>
            <Form.Group controlId="form-course-name">
                <Form.Label>Name:</Form.Label>
                <Form.Control
                    data-testid="textbox-edit-name"
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
                    data-testid="textbox-edit-descr"
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
                    data-testid="textbox-edit-credits"
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
                    data-testid="textbox-edit-preReqs"
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
            <Form.Group controlId="form-course-preReqDesc">
                <Form.Label>Prerequisite Description::</Form.Label>
                <Form.Control
                    data-testid="textbox-edit-preReqDesc"
                    value={editCourse.preReqDesc}
                    onChange={(e) =>
                        setEditCourse({
                            ...editCourse,
                            preReqDesc: e.target.value
                        })
                    }
                    as="textarea"
                    rows={2}
                />
            </Form.Group>
            <p></p>
            <Form.Group controlId="form-course-degreeRequirements">
                <Form.Label>Degree Requirements:</Form.Label>
                <Form.Select
                    data-testid="checkbox-requirement-list"
                    value={checkboxCategory}
                    onChange={(e) => setCheckboxCategory(e.target.value)}
                >
                    {categories.map(
                        (reqOption: string): JSX.Element => (
                            <option
                                key={reqOption}
                                value={reqOption}
                                data-testid={`requirement-option-${reqOption}`}
                            >
                                {reqOption}
                            </option>
                        )
                    )}
                </Form.Select>
                {degreeCategories[checkboxCategory].map(
                    (req: string): JSX.Element => (
                        <Form.Check
                            inline
                            key={checkboxCategory + "-" + req}
                            data-testid={
                                "radio-edit-degReq-" +
                                checkboxCategory +
                                "-" +
                                req
                            }
                            label={req}
                            value={checkboxCategory + "-" + req}
                            checked={editCourse.degreeRequirements.includes(
                                checkboxCategory + "-" + req
                            )}
                            onChange={updatedegreeRequirements}
                        />
                    )
                )}
            </Form.Group>
        </Modal.Body>
    );
}
