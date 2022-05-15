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
        screen.getByTestId("checkbox-requirement-list");

        expect(screen.queryAllByTestId(/radio-edit-degReq-/i)).toHaveLength(5);
    });
    test("Expect checkbox requirement list to have 11 options", () => {
        expect(screen.getByTestId("checkbox-requirement-list")).toHaveLength(
            11
        );
    });
    test("Expect checkbox requirement to change the checkboxes on screen", () => {
        const checkboxList = screen.getByTestId("checkbox-requirement-list");
        const modal = screen.getByTestId("courseModal");
        within(modal).getByText("CISC Core");
        within(modal).getByText("Lab Requirements");
        within(modal).getByText("Writing Requirements");
        within(modal).getByText("Capstone");
        within(modal).getByText("First Year Seminar");

        userEvent.selectOptions(checkboxList, "Data Science Concentration");
        within(modal).getByText("Concentration Requirements");
        within(modal).getByText("Advanced Data Science");
        within(modal).getByText("Advanced Math");
        within(modal).getByText("Restricted Electives");
    });
    test("Expect textbox fields to appear for a Course's name, description, credits, and course prereqs", () => {
        const name = screen.getByTestId("textbox-edit-name");
        const descr = screen.getByTestId("textbox-edit-descr");
        const credits = screen.getByTestId("textbox-edit-credits");
        const preReqs = screen.getByTestId("textbox-edit-preReqs");
        const preReqDesc = screen.getByTestId("textbox-edit-preReqDesc");

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
        userEvent.type(
            preReqDesc,
            "{selectall}Requires an A in CISC 108/MATH 242/BISC 207"
        );

        screen.getByTestId("courseModal-save-button").click();
        screen.getByTestId("courseModal-cancel-button").click();

        const modal = screen.getByTestId("courseModal");

        expect(modal).toHaveTextContent("Intro to Waffles");
        expect(modal).toHaveTextContent("This is a class about making waffles");
        expect(modal).toHaveTextContent("Credits: (8)");
        expect(modal).toHaveTextContent("CISC 108 or MATH 242 or BISC 207");
        expect(modal).toHaveTextContent("CISC 101");
        expect(modal).toHaveTextContent(
            "Requires an A in CISC 108/MATH 242/BISC 207"
        );
    });
    test("Expect checkboxes to change what requirements a course fulfills", () => {
        const checkboxList = screen.getByTestId("checkbox-requirement-list");
        screen.getByTestId("radio-edit-degReq-General-CISC Core").click();
        screen
            .getByTestId("radio-edit-degReq-General-Lab Requirements")
            .click();
        userEvent.selectOptions(checkboxList, "Bioinformatics Concentration");
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
    test("There is a button for resetting information back to the original catalog standard", () => {
        const defaultButton = screen.getByTestId("courseModal-default-button");
        defaultButton.click();
    });
    test("Expect the Reset Info as Default button to successfully revert changes to original description", () => {
        const name = screen.getByTestId("textbox-edit-name");
        const descr = screen.getByTestId("textbox-edit-descr");
        const credits = screen.getByTestId("textbox-edit-credits");
        const preReqs = screen.getByTestId("textbox-edit-preReqs");
        const preReqDesc = screen.getByTestId("textbox-edit-preReqDesc");
        const checkboxList = screen.getByTestId("checkbox-requirement-list");

        // modify all editable textfields to be different than the CISC 181 standard
        // already confirmed to correctly edit fields in previous tests
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
        userEvent.type(
            preReqDesc,
            "{selectall}Requires an A in CISC 108/MATH 242/BISC 207"
        );

        // Edit what requirements CISC 181 fulfills as well
        screen.getByTestId("radio-edit-degReq-General-CISC Core").click();
        screen
            .getByTestId("radio-edit-degReq-General-Lab Requirements")
            .click();
        userEvent.selectOptions(checkboxList, "Bioinformatics Concentration");
        screen
            .getByTestId(
                "radio-edit-degReq-Bioinformatics Concentration-Concentration Requirements"
            )
            .click();

        // Save changes and go back to info screen
        screen.getByTestId("courseModal-save-button").click();
        screen.getByTestId("courseModal-cancel-button").click();

        // go back to edit screen
        screen.getByTestId("courseModal-edit-button").click();

        // reset information
        screen.getByTestId("courseModal-default-button").click();

        // Infoview should appear after clicking reset info button
        expect(
            screen.getByText("Course Information for CISC 181")
        ).toBeInTheDocument();
        expect(
            screen.queryByText("EDIT Course Information for CISC 181")
        ).not.toBeInTheDocument();

        // Expect other standard information to be present as well
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

        // go back to edit screen to check checkboxes
        screen.getByTestId("courseModal-edit-button").click();

        // expect checkboxes to be reverted to original status as well
        expect(
            screen.getByTestId("radio-edit-degReq-General-CISC Core")
        ).toBeChecked();
        expect(
            screen.getByTestId("radio-edit-degReq-General-Lab Requirements")
        ).not.toBeChecked();

        const checkboxList2 = screen.getByTestId("checkbox-requirement-list");
        userEvent.selectOptions(checkboxList2, "Bioinformatics Concentration");
        expect(
            screen.getByTestId(
                "radio-edit-degReq-Bioinformatics Concentration-Concentration Requirements"
            )
        ).not.toBeChecked();
    });
});
