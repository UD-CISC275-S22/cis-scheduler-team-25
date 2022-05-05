import React from "react";
import { render, screen, within } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";

describe("TransferModalView and SemesterTransferList Tests", () => {
    beforeEach(() => {
        render(<App />);
        const select = screen.getByTestId("plan-list");
        userEvent.selectOptions(select, "Example Degree Plan 2");

        screen.getByTestId("main-plan-button").click();
    });
    test("There should be a buttons to go from Info to Transfer Views, and vice versa", () => {
        screen.getByTestId("semester-Fall-2022").click();
        screen.getByTestId("plan-semester-button").click();

        const CISC108 = screen.getByTestId("draggable-CISC 108");
        userEvent.dblClick(CISC108);

        const modal = screen.getByTestId("courseModal");

        expect(modal).not.toHaveTextContent(
            "Transfer CISC 108 to a New Semester"
        );

        screen.getByTestId("courseModal-transfer-button").click();

        expect(modal).toHaveTextContent("Transfer CISC 108 to a New Semester");

        screen.getByTestId("courseModal-cancel-button").click();

        expect(modal).not.toHaveTextContent(
            "Transfer CISC 108 to a New Semester"
        );
    });
    test("There should be a buttons to go from Info to Transfer Views, and then a close button to reset the modal", () => {
        screen.getByTestId("semester-Fall-2022").click();
        screen.getByTestId("plan-semester-button").click();

        const CISC108 = screen.getByTestId("draggable-CISC 108");
        userEvent.dblClick(CISC108);

        const modal = screen.getByTestId("courseModal");

        expect(modal).not.toHaveTextContent(
            "Transfer CISC 108 to a New Semester"
        );

        screen.getByTestId("courseModal-transfer-button").click();

        expect(modal).not.toHaveTextContent("Course Information for CISC 108");

        screen.getByTestId("courseModal-close-button").click();

        userEvent.dblClick(CISC108);

        expect(modal).toHaveTextContent("Course Information for CISC 108");
    });
    test("A SemesterTransferList should appear in the TransferModalView with appropriate number of options", () => {
        screen.getByTestId("semester-Fall-2022").click();
        screen.getByTestId("plan-semester-button").click();

        const CISC108 = screen.getByTestId("draggable-CISC 108");
        userEvent.dblClick(CISC108);

        screen.getByTestId("courseModal-transfer-button").click();

        const select = screen.getByTestId("transfer-list");

        expect(select).toHaveLength(2);
    });
    test("A TransferModalView displays an appropriate message depending on if the SemesterTransferList option can be used (future semesters)", () => {
        screen.getByTestId("semester-Fall-2022").click();
        screen.getByTestId("plan-semester-button").click();

        const CISC108 = screen.getByTestId("draggable-CISC 108");
        userEvent.dblClick(CISC108);

        screen.getByTestId("courseModal-transfer-button").click();

        const select = screen.getByTestId("transfer-list");
        const modal = screen.getByTestId("courseModal");
        const transferButton = screen.getByTestId(
            "courseModal-transfer-close-button"
        );

        userEvent.selectOptions(select, "Spring-2023");

        // No course from Fall-2022 or Spring-2023 should require CISC 108
        expect(modal).toHaveTextContent(
            "Course can be transferred to semester!"
        );
        expect(transferButton).toBeEnabled();

        userEvent.selectOptions(select, "Fall-2023");

        // Fall-2023 contains CISC 181, which requires 108 to have been taken before it
        expect(modal).toHaveTextContent(
            "Transfer conflicts with required prerequesites."
        );
        expect(transferButton).toBeDisabled();
    });
    test("A TransferModalView displays an appropriate message depending on if the SemesterTransferList option can be used (past semesters)", () => {
        screen.getByTestId("semester-Fall-2023").click();
        screen.getByTestId("plan-semester-button").click();

        const CISC181 = screen.getByTestId("draggable-CISC 181");
        userEvent.dblClick(CISC181);

        screen.getByTestId("courseModal-transfer-button").click();

        const modal = screen.getByTestId("courseModal");
        const select = within(modal).getByTestId("transfer-list");
        const transferButton = screen.getByTestId(
            "courseModal-transfer-close-button"
        );

        userEvent.selectOptions(select, "Fall-2022");

        // Fall-2022 does not have a history of taking 108 yet, which is needed for 181
        expect(modal).toHaveTextContent(
            "Transfer conflicts with required prerequesites."
        );
        expect(transferButton).toBeDisabled();

        userEvent.selectOptions(select, "Spring-2023");

        // By Spring-2023, CISC 108 has been taken, which is needed for 181
        expect(modal).toHaveTextContent(
            "Course can be transferred to semester!"
        );
        expect(transferButton).toBeEnabled();
    });
    test("You can successfully transfer a course to another semester", () => {
        screen.getByTestId("semester-Fall-2022").click();
        screen.getByTestId("plan-semester-button").click();

        const CISC108 = screen.getByTestId("draggable-CISC 108");
        userEvent.dblClick(CISC108);

        screen.getByTestId("courseModal-transfer-button").click();

        const select = screen.getByTestId("transfer-list");
        const transferButton = screen.getByTestId(
            "courseModal-transfer-close-button"
        );

        // transfer CISC 108 from Fall 2022 to Spring 2023
        userEvent.selectOptions(select, "Spring-2023");
        transferButton.click();

        const currentSemesterPool = screen.getByTestId(
            "droppable-semesterPool"
        );

        // CISC 108 should no longer be in current semester
        expect(
            within(currentSemesterPool).queryByTestId("draggable-CISC 108")
        ).not.toBeInTheDocument();

        // go to transferred semester
        screen.getByTestId("semester-plan-button").click();
        screen.getByTestId("semester-Spring-2023").click();
        screen.getByTestId("plan-semester-button").click();

        // Check that CISC 108 is in the transferred semester
        const transferSemesterPool = screen.getByTestId(
            "droppable-semesterPool"
        );
        expect(
            within(transferSemesterPool).queryByTestId("draggable-CISC 108")
        ).toBeInTheDocument();
    });
});
