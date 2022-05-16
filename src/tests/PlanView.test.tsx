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

        expect(screen.getByText(/Remove All Semesters/i)).toBeInTheDocument();
        removeAllSemesters.click();
        expect(screen.queryByText("Fall-2022")).not.toBeInTheDocument();
        expect(screen.queryByText("Spring-2023")).not.toBeInTheDocument();
        expect(screen.getByText("0 Semesters Total")).toBeInTheDocument();
    });
    test("There is a button for deleting a single semester", () => {
        const removeCurrentSemesters = screen.getByTestId(
            "remove-current-semester-button"
        );

        expect(screen.getByText("Fall-2022")).toBeInTheDocument();
        screen.getByTestId("semester-Fall-2022").click();
        removeCurrentSemesters.click();

        expect(screen.queryByText("Fall-2022")).not.toBeInTheDocument();
        expect(screen.queryByText("Spring-2023")).toBeInTheDocument();
    });
    test("Different header is displayed for a different degree plan", () => {
        screen.getByTestId("plan-main-button").click();

        userEvent.selectOptions(
            screen.getByTestId("plan-list"),
            "Example Degree Plan 2"
        );

        screen.getByTestId("main-plan-button").click();
        expect(screen.getByText("Example Degree Plan 2")).toBeInTheDocument();
    });
});
