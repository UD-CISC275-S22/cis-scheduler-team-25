import React from "react";
import { render, screen, within } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";

describe("CourseModal Tests", () => {
    beforeEach(() => {
        render(<App />);
        screen.getByTestId("main-plan-button").click();
        screen.getByTestId("semester-Fall-2022").click();
        screen.getByTestId("plan-semester-button").click();

        const CISC181 = screen.getByTestId("draggable-CISC 181");
        userEvent.dblClick(CISC181);

        screen.getByTestId("courseModal-edit-button").click();
    });
    test("Expect textbox fields to appear for a Course's name, description, credits, and course prereqs", () => {
        screen.getByTestId("textbox-edit-name");
        screen.getByTestId("textbox-edit-descr");
        screen.getByTestId("textbox-edit-credits");
        screen.getByTestId("textbox-edit-preReqs");

        expect(screen.queryAllByTestId(/radio-edit-degReq-/i)).toHaveLength(43);
    });
    test("Expect textbox fields to appear for a Course's name, description, credits, and course prereqs", () => {
        const name = screen.getByTestId("textbox-edit-name");
        const descr = screen.getByTestId("textbox-edit-descr");
        const credits = screen.getByTestId("textbox-edit-credits");
        const preReqs = screen.getByTestId("textbox-edit-preReqs");

        userEvent.type(name, "{selectall}Intro to Waffles");
        userEvent.type(
            descr,
            "{selectall}This is a class about making waffles"
        );
        userEvent.type(credits, "{selectall}8");
        userEvent.type(
            preReqs,
            "{selectall}CISC 108,MATH 242,BISC 207\nCISC 101"
        );

        screen.getByTestId("courseModal-save-button").click();
        screen.getByTestId("courseModal-cancel-button").click();

        const modal = screen.getByTestId("courseModal");

        expect(modal).toHaveTextContent("Intro to Waffles");
        expect(modal).toHaveTextContent("This is a class about making waffles");
        expect(modal).toHaveTextContent("Credits: (8)");
        expect(modal).toHaveTextContent("CISC 108 or MATH 242 or BISC 207");
        expect(modal).toHaveTextContent("CISC 101");
    });
    test("Expect checkboxes to change what requirements a course fulfills", () => {
        screen.getByTestId("radio-edit-degReq-General-CISC Core").click();
        screen
            .getByTestId("radio-edit-degReq-General-Lab Requirements")
            .click();
        screen
            .getByTestId(
                "radio-edit-degReq-Bioinformatics Concentration-Concentration Requirements"
            )
            .click();

        screen.getByTestId("courseModal-save-button").click();
        screen.getByTestId("courseModal-close-button").click();

        const coursePool = screen.getByTestId("droppable-coursePool");
        const select = screen.getByTestId("requirement-list");

        // CISC 181 should no longer by in General-CISC Core
        expect(
            within(coursePool).queryByTestId("draggable-CISC 181")
        ).not.toBeInTheDocument();

        userEvent.selectOptions(select, "Lab Requirements");

        // CISC 181 should now be in Lab Requirements
        expect(
            within(coursePool).queryByTestId("draggable-CISC 181")
        ).toBeInTheDocument();

        screen.getByTestId("radio-Bioinformatics Concentration").click();

        // ...and also
        expect(
            within(coursePool).queryByTestId("draggable-CISC 181")
        ).toBeInTheDocument();
    });
});
