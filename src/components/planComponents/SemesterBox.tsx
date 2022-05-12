import React from "react";
import { Semester } from "../../interfaces/semester";
import { Course } from "../../interfaces/course";
import { ListGroup } from "react-bootstrap";
import "../components.css";

function getSeasonColor(season: string): string {
    switch (season) {
        case "Fall":
            return "#e2d5bd";
        case "Winter":
            return "#bdd1e2";
        case "Spring":
            return "#c9e2bd";
        case "Summer":
            return "#dfe2bd";
        default:
            return "#ffffff";
    }
}

export function SemesterBox({ semester }: { semester: Semester }): JSX.Element {
    return (
        <ListGroup className="semester-box-height">
            <ListGroup.Item
                style={{ backgroundColor: getSeasonColor(semester.season) }}
            >
                <strong>
                    {semester.season + "-" + semester.year.toString()}
                </strong>
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
