import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";

describe("MainView Tests", () => {
    beforeEach(() => {
        render(<App />);
    });
    test("Expect main menu text to display", () => {
        expect(screen.getByText("Degree Plan Selector")).toBeInTheDocument();
    });
    test("There is a button for switching the view to a degree plan", () => {
        const planButton = screen.getByTestId("main-plan-button");
        planButton.click();
        expect(
            screen.queryByText("Degree Plan Selector")
        ).not.toBeInTheDocument();
    });
    test("Any empty plan list disables main-plan-button", () => {
        const select = screen.getByTestId("plan-list");

        userEvent.selectOptions(select, "Example Degree Plan 1");
        screen.getByTestId("edit-plan-button").click();
        screen.getByTestId("remove-plan-by-name-button").click();

        userEvent.selectOptions(select, "Example Degree Plan 2");
        screen.getByTestId("edit-plan-button").click();
        screen.getByTestId("remove-plan-by-name-button").click();

        expect(screen.getByTestId("main-plan-button")).toBeDisabled();
    });
});
