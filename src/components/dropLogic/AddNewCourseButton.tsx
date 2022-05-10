import React from "react";
import { Button } from "react-bootstrap";
import { catalog } from "../ReadJSON";
import "../components.css";

type AddNewCourseButtonProps = {
    input: string;
};

function checkValidity(input: string) {
    return (
        catalog[input.slice(0, 4).trim()] !== undefined &&
        catalog[input.slice(0, 4).trim()][input] !== undefined
    );
}

export function AddNewCourseButton({
    input
}: AddNewCourseButtonProps): JSX.Element {
    const disabled = !checkValidity(input);

    return (
        <Button disabled={disabled}>
            {disabled ? "Invalid Course" : "Add Course To Pool"}
        </Button>
    );
}
