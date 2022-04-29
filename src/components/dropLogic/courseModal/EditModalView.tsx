import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { saveChanges, checkValidFields } from "./courseEditValidation";
import { Course } from "../../../interfaces/course";
import { EditableCourse } from "../../../interfaces/editable_course";
import { Semester } from "../../../interfaces/semester";
import { DegreePlan } from "../../../interfaces/degreeplan";
import { EditModalBody } from "./EditModalBody";
import "../../components.css";

type EditModalViewProps = {
    currentCourse: Course;
    setCurrentCourse: (newCourse: Course) => void;
    setShowCourseEditor: (newVal: boolean) => void;
    setCourseModalMode: (newMode: string) => void;
    courseList: Course[];
    setCourseList: (newCourses: Course[]) => void;
    currentSemester: Semester;
    setCurrentSemester: (newSemester: Semester) => void;
    currentPlan: DegreePlan;
    setCurrentPlan: (newPlan: DegreePlan) => void;
    plans: DegreePlan[];
    setPlans: (newPlans: DegreePlan[]) => void;
    setCoursePool: (newCourses: Course[]) => void;
    category: string;
    requirement: string;
};

export function EditModalView({
    currentCourse,
    setCurrentCourse,
    setShowCourseEditor,
    setCourseModalMode,
    courseList,
    setCourseList,
    currentSemester,
    setCurrentSemester,
    currentPlan,
    setCurrentPlan,
    plans,
    setPlans,
    setCoursePool,
    category,
    requirement
}: EditModalViewProps): JSX.Element {
    const [editCourse, setEditCourse] = useState<EditableCourse>({
        name: currentCourse.name,
        descr: currentCourse.descr,
        credits: currentCourse.credits,
        preReqs: currentCourse.preReqs
            .map((reqGroup: string[]): string => reqGroup.join(","))
            .join("\n"),
        degreeRequirement: currentCourse.degreeRequirement
    });

    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>
                    <strong>EDIT</strong> Course Information for{" "}
                    {currentCourse.code}
                </Modal.Title>
            </Modal.Header>

            <EditModalBody
                editCourse={editCourse}
                setEditCourse={setEditCourse}
            />

            <Modal.Footer>
                <Button
                    data-testid="courseModal-save-button"
                    variant="primary"
                    disabled={!checkValidFields(editCourse)}
                    onClick={() =>
                        saveChanges(
                            editCourse,
                            currentCourse,
                            setCurrentCourse,
                            courseList,
                            setCourseList,
                            currentSemester,
                            setCurrentSemester,
                            currentPlan,
                            setCurrentPlan,
                            plans,
                            setPlans,
                            setCoursePool,
                            category + "-" + requirement
                        )
                    }
                >
                    Save Changes
                </Button>
                <Button
                    data-testid="courseModal-cancel-button"
                    variant="primary"
                    onClick={() => setCourseModalMode("info")}
                >
                    Cancel Changes
                </Button>
                <Button
                    data-testid="courseModal-close-button"
                    variant="secondary"
                    onClick={() => {
                        setShowCourseEditor(false);
                        setCourseModalMode("info");
                    }}
                >
                    Close
                </Button>
            </Modal.Footer>
        </>
    );
}
