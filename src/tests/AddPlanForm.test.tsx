import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";

describe("Add Semester Form Tests", () => {
    beforeEach(() => {
        render(<App />);
    });
    test("There is button for adding a new plan, which toggles the AddSemesterForm", () => {
        const addPlanButton = screen.getByTestId("add-plan-button");
        expect(screen.queryByTestId("insert-plan-confirm-button")).not
            .toBeInTheDocument;
        expect(screen.queryByTestId("insert-plan-add-name")).not
            .toBeInTheDocument;

        addPlanButton.click();

        expect(screen.queryByTestId("insert-plan-confirm-button"))
            .toBeInTheDocument;
        expect(screen.queryByTestId("insert-plan-add-name")).toBeInTheDocument;
    });
    test("The confirm button is default disabled, and disabled when existing plan is type in", () => {
        const addPlanButton = screen.getByTestId("add-plan-button");

        addPlanButton.click();

        const confirmButton = screen.getByTestId("insert-plan-confirm-button");
        expect(confirmButton).toBeDisabled();

        const planNameTextBox = screen.getByTestId("insert-plan-add-name");
        userEvent.type(planNameTextBox, "Example Degree Plan 1");
        expect(confirmButton).toBeDisabled();
    });
    test("The confirm button works and you can insert a new plan.", () => {
        const addPlanButton = screen.getByTestId("add-plan-button");
        addPlanButton.click();

        const planNameTextBox = screen.getByTestId("insert-plan-add-name");
        userEvent.type(planNameTextBox, "Example Degree Plan 3");

        const confirmButton = screen.getByTestId("insert-plan-confirm-button");
        confirmButton.click();

        const select = screen.getByTestId("plan-list");
        userEvent.selectOptions(select, "Example Degree Plan 3");
        expect(screen.getByText("0 Semesters Included")).toBeInTheDocument();
    });
});
