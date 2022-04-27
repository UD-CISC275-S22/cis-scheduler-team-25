import React from "react";
import { Semester } from "../../interfaces/semester";
import { Course } from "../../interfaces/course";
import { ListGroup } from "react-bootstrap";
import "./components.css";

export function SemesterBox({ semester }: { semester: Semester }): JSX.Element {
    return (
        <ListGroup className="semester-box-height">
            <ListGroup.Item>
                {semester.season.toString() + "-" + semester.year.toString()}
            </ListGroup.Item>
            {semester.courses.map(
                (course: Course): JSX.Element => (
                    <ListGroup.Item
                        key={course.code}
                        style={{ textAlign: "left" }}
                    >
                        {course.code} <br></br>
                        {course.name}
                    </ListGroup.Item>
                )
            )}
        </ListGroup>
    );
}
