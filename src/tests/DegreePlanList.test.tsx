import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe("DegreePlanList Tests", () => {
    beforeEach(() => {
        render(<App />);
    });
    test("There is a select box", () => {
        expect(screen.getByTestId("plan-list")).toBeInTheDocument();
        expect(screen.getByTestId("plan-list")).toHaveLength(2);
    });
    test("You can select the test plan length displays", () => {
        const select = screen.getByTestId("plan-list");

        userEvent.selectOptions(select, "Example Degree Plan 1");
        expect(screen.getByText("2 Semesters Included")).toBeInTheDocument();

        userEvent.selectOptions(select, "Example Degree Plan 2");
        expect(screen.getByText("3 Semesters Included")).toBeInTheDocument();
    });
    test("Deleting all plans shows alert message", () => {
        const select = screen.getByTestId("plan-list");

        userEvent.selectOptions(select, "Example Degree Plan 1");
        screen.getByTestId("edit-plan-button").click();
        screen.getByTestId("remove-plan-by-name-button").click();

        userEvent.selectOptions(select, "Example Degree Plan 2");
        screen.getByTestId("edit-plan-button").click();
        screen.getByTestId("remove-plan-by-name-button").click();

        expect(
            screen.getByText("There are currently no existing plans")
        ).toBeInTheDocument();
    });
});
