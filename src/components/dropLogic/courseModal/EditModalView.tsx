import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import {
    saveChanges,
    checkValidFields,
    getDefaultCourse
} from "./utils/courseEditValidation";
import { Course } from "../../../interfaces/course";
import { EditableCourse } from "../../../interfaces/editable_course";
import { EditModalBody } from "./EditModalBody";
import "../../components.css";
import { usePlanContext } from "../../context/PlanContext";

type EditModalViewProps = {
    currentCourse: Course;
    setCurrentCourse: (newCourse: Course) => void;
    setShowCourseEditor: (newVal: boolean) => void;
    setCourseModalMode: (newMode: string) => void;
    courseList: Course[];
    setCourseList: (newCourses: Course[]) => void;
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
    setCoursePool,
    category,
    requirement
}: EditModalViewProps): JSX.Element {
    const {
        plans,
        setPlans,
        currentPlan,
        setCurrentPlan,
        currentSemester,
        setCurrentSemester
    } = usePlanContext();
    const [editCourse, setEditCourse] = useState<EditableCourse>({
        name: currentCourse.name,
        descr: currentCourse.descr,
        credits: currentCourse.credits,
        preReqs: currentCourse.preReqs
            .map((reqGroup: string[]): string => reqGroup.join(","))
            .join("\n"),
        preReqDesc: currentCourse.preReqDesc,
        degreeRequirements: currentCourse.degreeRequirements
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
                    data-testid="courseModal-default-button"
                    variant="primary"
                    onClick={() => {
                        saveChanges(
                            getDefaultCourse(currentCourse.code),
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
                        );
                        setCourseModalMode("info");
                    }}
                >
                    Reset Information as Default
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
