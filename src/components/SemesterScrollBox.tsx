import React from "react";
import { SemesterBox } from "./SemesterBox";
import { DegreePlan } from "../interfaces/degreeplan";
import { Semester } from "../interfaces/semester";
import { ListGroup } from "react-bootstrap";

export function SemesterScrollBox({
    plan,
    setMode,
    setCurrentSemester
}: {
    plan: DegreePlan;
    setMode: (newMode: string) => void;
    setCurrentSemester: (newSemester: Semester) => void;
}): JSX.Element {
    return (
        <div>
            <ListGroup
                horizontal={true}
                data-testid="semester-scroll-box"
                className="semester-scroll-box"
            >
                {plan.semesters.map(
                    (semester: Semester): JSX.Element => (
                        <ListGroup.Item
                            data-testid={
                                "semester-" +
                                semester.season.toString() +
                                semester.year.toString()
                            }
                            action={true}
                            onClick={() => {
                                setMode("semester");
                                setCurrentSemester(semester);
                            }}
                            className="semester-box-length"
                            key={
                                semester.season.toString() +
                                semester.year.toString()
                            }
                        >
                            <SemesterBox semester={semester} />
                        </ListGroup.Item>
                    )
                )}
            </ListGroup>
        </div>
    );
}
