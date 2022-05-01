import React from "react";
import "../../components.css";
import { Form } from "react-bootstrap";
import { Semester } from "../../../interfaces/semester";

type TransferSemestersListProps = {
    semesters: Semester[];
    transferId: number;
    setTransferId: (newId: number) => void;
};

// shows list of possible semesters to transfer a course to
export function TransferSemestersList({
    semesters,
    transferId,
    setTransferId
}: TransferSemestersListProps): JSX.Element {
    // callback function for the Form onChange, updates the currently selected plan
    function updateSelection(event: React.ChangeEvent<HTMLSelectElement>) {
        setTransferId(parseFloat(event.target.value));
    }

    return (
        <div className="DegreePlanList">
            <p>Transfer to Which Semester?:</p>
            <Form.Group className="dropdown-border" controlId="planList">
                <Form.Select
                    data-testid="transfer-list"
                    value={transferId}
                    onChange={updateSelection}
                >
                    {semesters.map(
                        (semester: Semester): JSX.Element => (
                            <option
                                key={semester.id}
                                value={semester.id}
                                data-testid={`transfer-option-${
                                    semester.season +
                                    "-" +
                                    semester.year.toString()
                                }`}
                            >
                                {semester.season +
                                    "-" +
                                    semester.year.toString()}
                            </option>
                        )
                    )}
                </Form.Select>
            </Form.Group>
            <br></br>
        </div>
    );
}
