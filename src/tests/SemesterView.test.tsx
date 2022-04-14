import React from "react";
import { render, screen, within } from "@testing-library/react";
import App from "../App";

describe("SemesterView Tests", () => {
    beforeEach(() => {
        render(<App />);
        screen.getByTestId("main-plan-button").click();
        screen.getByTestId("plan-semester-button").click();
    });
    test("Expect semester view text to display", () => {
        expect(screen.getByText(/Schedule for/i)).toBeInTheDocument();
    });
    test("There is a button for switching the view to degree plan", () => {
        const planButton = screen.getByTestId("semester-plan-button");
        planButton.click();
        expect(
            screen.queryByText("Your Semester Schedule")
        ).not.toBeInTheDocument();
    });
    test("remove-all-courses-from-semester", () => {
        const removeAllCourses = screen.getByTestId(
            "remove-all-courses-from-semester"
        );
        removeAllCourses.click();
        const semester1 = screen.getByTestId("semester-F2022");
        const semester2 = screen.getByTestId("semester-S2023");

        expect(within(semester1).getByText("1.108")).not.toBeInTheDocument();
        expect(within(semester1).getByText("1.181")).not.toBeInTheDocument();
        expect(within(semester1).getByText("2.241")).not.toBeInTheDocument();

        expect(within(semester2).getByText("3.123")).not.toBeInTheDocument();
        expect(within(semester2).getByText("1.181")).not.toBeInTheDocument();
        expect(within(semester2).getByText("2.242")).not.toBeInTheDocument();
    });
});
