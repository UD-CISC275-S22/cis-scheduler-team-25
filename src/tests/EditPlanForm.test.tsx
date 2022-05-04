import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";

describe("Edit Plan Form Tests", () => {
    beforeEach(() => {
        render(<App />);
    });
    test("There is button for editing a plan, which toggles the edit plan form", () => {
        const editPlanButton = screen.getByTestId("edit-plan-button");
        expect(screen.queryByTestId("remove-plan-by-name-button")).not
            .toBeInTheDocument;
        expect(screen.queryByTestId("edit-plan-by-name-button")).not
            .toBeInTheDocument;

        editPlanButton.click();

        expect(screen.queryByTestId("remove-plan-by-name-button"))
            .toBeInTheDocument;
        expect(screen.queryByTestId("edit-plan-by-name-button"))
            .toBeInTheDocument;
    });
    test("The edit plan name button works", () => {
        const editPlanButton = screen.getByTestId("edit-plan-button");
        editPlanButton.click();
        const editNameConfirm = screen.getByTestId("edit-plan-by-name-button");

        const select = screen.getByTestId("plan-list");
        userEvent.selectOptions(select, "Naruto's Degree Plan 1");

        const editPlanTextBox = screen.getByTestId("edit-plan-name-text");
        userEvent.type(editPlanTextBox, "Test: Remove");

        editNameConfirm.click();
        expect(screen.getByText("Test: Remove")).toBeInTheDocument();
        expect(
            screen.queryByText("Naruto's Degree Plan 1")
        ).not.toBeInTheDocument();
    });
    test("The remove plan button works (2)", () => {
        const editPlanButton = screen.getByTestId("edit-plan-button");
        editPlanButton.click();

        const removePlan = screen.getByTestId("remove-plan-by-name-button");

        const select = screen.getByTestId("plan-list");
        userEvent.selectOptions(select, "Naruto's Degree Plan 2");

        expect(screen.getByText("Naruto's Degree Plan 2")).toBeInTheDocument();
        removePlan.click();
        expect(
            screen.queryByText("Naruto's Degree Plan 2")
        ).not.toBeInTheDocument();
    });
});
