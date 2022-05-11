import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Course } from "../../../interfaces/course";
import { Semester } from "../../../interfaces/semester";
import { TransferSemestersList } from "./TransferSemestersList";
import "../../components.css";
import { validateTransfer } from "./utils/courseTransferUtils";
import { transferCourse } from "./utils/courseTransferUtils";
import { usePlanContext } from "../../context/PlanContext";

type TransferModalViewProps = {
    currentCourse: Course;
    setCourseModalMode: (newMode: string) => void;
    setShowCourseEditor: (newShow: boolean) => void;
};

export function TransferModalView({
    currentCourse,
    setCourseModalMode,
    setShowCourseEditor
}: TransferModalViewProps): JSX.Element {
    const {
        plans,
        setPlans,
        currentPlan,
        setCurrentPlan,
        currentSemester,
        setCurrentSemester
    } = usePlanContext();
    const validTransferSemesters = currentPlan.semesters.filter(
        (semester: Semester): boolean => semester.id !== currentSemester.id
    );

    // ID of semester you're transferring to
    const [transferId, setTransferId] = useState<number>(
        validTransferSemesters[0].id
    );

    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>
                    Transfer {currentCourse.code} to a New Semester
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <TransferSemestersList
                    semesters={validTransferSemesters}
                    transferId={transferId}
                    setTransferId={setTransferId}
                />
                {validateTransfer(
                    currentCourse,
                    currentSemester,
                    currentPlan,
                    transferId
                )
                    ? "Course can be transferred to semester!"
                    : "Transfer conflicts with required prerequesites."}
            </Modal.Body>
            <Modal.Footer>
                <Button
                    data-testid="courseModal-cancel-button"
                    variant="primary"
                    onClick={() => setCourseModalMode("info")}
                >
                    Cancel Transfer
                </Button>
                <Button
                    variant="primary"
                    disabled={
                        !validateTransfer(
                            currentCourse,
                            currentSemester,
                            currentPlan,
                            transferId
                        )
                    }
                    onClick={() => {
                        setShowCourseEditor(false);
                        transferCourse(
                            transferId,
                            currentCourse,
                            plans,
                            currentPlan,
                            currentSemester,
                            setPlans,
                            setCurrentPlan,
                            setCurrentSemester
                        );
                        setCourseModalMode("info");
                    }}
                    data-testid="courseModal-transfer-close-button"
                >
                    Transfer and Close
                </Button>
                <Button
                    variant="secondary"
                    onClick={() => {
                        setShowCourseEditor(false);
                        setCourseModalMode("info");
                    }}
                    data-testid="courseModal-close-button"
                >
                    Close Without Saving
                </Button>
            </Modal.Footer>
        </>
    );
}
