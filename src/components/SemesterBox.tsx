import React from "react";
import { Semester } from "../interfaces/semester";
import { ListGroup } from "react-bootstrap";
import "./components.css";

export function SemesterBox({ semester }: { semester: Semester }): JSX.Element {
    return (
        <ListGroup className="semester-box-height">
            <ListGroup.Item>
                {semester.season.toString() + "-" + semester.year.toString()}
            </ListGroup.Item>
            {semester.courses.map(
                (courseID: number): JSX.Element => (
                    <ListGroup.Item
                        key={courseID}
                        style={{ textAlign: "left" }}
                    >
                        {courseID}
                    </ListGroup.Item>
                )
            )}
        </ListGroup>
    );
}
