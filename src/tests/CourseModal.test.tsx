import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";

describe("CourseModal Tests", () => {
    beforeEach(() => {
        render(<App />);
        screen.getByTestId("main-plan-button").click();
        screen.getByTestId("semester-Fall-2022").click();
        screen.getByTestId("plan-semester-button").click();
    });
    test("Double clicking a draggable course brings up the CourseModal in InfoView", () => {
        // check that modal is not on screen
        expect(screen.queryByTestId("courseModal")).not.toBeInTheDocument();

        // find draggable course and double click it
        const CISC181 = screen.getByTestId("draggable-CISC 181");
        userEvent.dblClick(CISC181);

        // check that modal is on screen
        expect(screen.getByTestId("courseModal")).toBeInTheDocument();

        // We want the InfoView version, NOT the EditView version
        expect(
            screen.getByText("Course Information for CISC 181")
        ).toBeInTheDocument();
        expect(
            screen.queryByText("EDIT Course Information for CISC 181")
        ).not.toBeInTheDocument();

        // Expect other information to be present as well
        expect(
            screen.getByText(
                "Principles of computer science illustrated and applied through programming in an object oriented language. Programming projects illustrate computational problems, styles and issues that arise in computer systems development and in all application areas of computation."
            )
        ).toBeInTheDocument();
        expect(screen.getByText("CISC 108 or CISC 106")).toBeInTheDocument();
        expect(
            screen.getByText("Grade of C- or better in CISC 108 or CISC 106.")
        ).toBeInTheDocument();
        expect(
            screen.getByText(
                "University: Mathematics, Natural Sciences and Technology; A&S: GROUP D: A&S Math, Nat Sci & Technology"
            )
        ).toBeInTheDocument();
        expect(screen.getByText("Fall, Summer and Spring")).toBeInTheDocument();
    });
    test("The close button exists in the InfoView", async () => {
        // check that modal is not on screen
        expect(screen.queryByTestId("courseModal")).not.toBeInTheDocument();

        const CISC181 = screen.getByTestId("draggable-CISC 181");
        userEvent.dblClick(CISC181);

        // check that modal now on screen
        expect(screen.queryByTestId("courseModal")).toBeInTheDocument();

        const closeButton = screen.getByTestId("courseModal-close-button");
        closeButton.click();
    });
    test("The edit button exists in the InfoView and switches to EditView", () => {
        const CISC181 = screen.getByTestId("draggable-CISC 181");
        userEvent.dblClick(CISC181);

        expect(
            screen.queryByText("EDIT Course Information for CISC 181")
        ).not.toBeInTheDocument();

        const editButton = screen.getByTestId("courseModal-edit-button");
        editButton.click();

        expect(
            screen.queryByTestId("courseModal-edit-button")
        ).not.toBeInTheDocument();
    });
});
