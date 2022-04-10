import React from "react";
import { SemesterBox } from "./SemesterBox";
import { DegreePlan } from "../interfaces/degreeplan";
import { Semester } from "../interfaces/semester";
import { ListGroup } from "react-bootstrap";

export function SemesterScrollBox({ plan }: { plan: DegreePlan }): JSX.Element {
    return (
        <div>
            <ListGroup horizontal={true} className="semester-scroll-box">
                {plan.semesters.map(
                    (semester: Semester): JSX.Element => (
                        <ListGroup.Item
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
