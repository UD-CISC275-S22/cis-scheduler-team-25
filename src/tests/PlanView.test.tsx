import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";
describe("PlanView Tests", () => {
    beforeEach(() => {
        render(<App />);
        const planButton = screen.getByTestId("main-plan-button");
        planButton.click();
    });
    test("There is a button for switching the view to the main view", () => {
        const mainButton = screen.getByTestId("plan-main-button");

        expect(
            screen.queryByText("Degree Plan Selector")
        ).not.toBeInTheDocument();
        mainButton.click();

        expect(screen.getByText("Degree Plan Selector")).toBeInTheDocument();
    });
    test("There is a button for switching the view to the semester view", () => {
        expect(screen.getByTestId("plan-semester-button")).toBeInTheDocument();
    });
    test("There is a button for removing all semesters", () => {
        const removeAllSemesters = screen.getByTestId(
            "remove-all-semesters-button"
        );

        expect(screen.getByText("Remove All Semesters")).toBeInTheDocument();
        removeAllSemesters.click();
        expect(screen.queryByText("F-2022")).not.toBeInTheDocument();
        expect(screen.queryByText("S-2023")).not.toBeInTheDocument();
        expect(screen.getByText("0 Semesters Total")).toBeInTheDocument();
    });
    test("Different header is displayed for a different degree plan", () => {
        screen.getByTestId("plan-main-button").click();

        userEvent.selectOptions(
            screen.getByTestId("plan-list"),
            "Naruto's Degree Plan 2"
        );

        screen.getByTestId("main-plan-button").click();
        expect(screen.getByText("Naruto's Degree Plan 2")).toBeInTheDocument();
    });
});
