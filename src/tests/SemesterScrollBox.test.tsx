import React from "react";
import { render, screen, within } from "@testing-library/react";
import App from "../App";

describe("Semester Scroll Box Tests", () => {
    beforeEach(() => {
        render(<App />);
        const planButton = screen.getByTestId("main-plan-button");
        planButton.click();
    });
    test("The SemesterScrollBox exists and has two elements", () => {
        const scrollBox = screen.getByTestId("semester-scroll-box");
        expect(scrollBox.children).toHaveLength(2);
    });
    test("Semester names are displayed", () => {
        expect(screen.getByText("Fall-2022")).toBeInTheDocument();
        expect(screen.getByText("Spring-2023")).toBeInTheDocument();
    });
    test("Each SemesterBox contains that semester's courses and descriptions", () => {
        const semester1 = screen.getByTestId("semester-Fall-2022");
        const semester2 = screen.getByTestId("semester-Spring-2023");

        expect(within(semester1).getByText(/CISC 108/i)).toBeInTheDocument();
        expect(
            within(semester1).getByText(/Introduction to Computer Science I/i)
        ).toBeInTheDocument();
        expect(within(semester1).getByText(/MATH 241/i)).toBeInTheDocument();
        expect(
            within(semester1).getByText(/Analytic Geometry and Calculus A/i)
        ).toBeInTheDocument();

        expect(within(semester2).getByText(/MATH 242/i)).toBeInTheDocument();
        expect(
            within(semester2).getByText(/Analytic Geometry and Calculus B/i)
        ).toBeInTheDocument();
        expect(within(semester2).getByText(/CISC 181/i)).toBeInTheDocument();
        expect(
            within(semester2).getByText(/Introduction to Computer Science II/i)
        ).toBeInTheDocument();
        expect(within(semester2).getByText(/CISC 210/i)).toBeInTheDocument();
        expect(
            within(semester2).getByText(/Introduction to Systems Programming/i)
        ).toBeInTheDocument();
    });
    test("Clicking the first SemesterBox displays a header for that specific semester", () => {
        const semester1 = screen.getByTestId("semester-Fall-2022");

        semester1.click();
        screen.getByTestId("plan-semester-button").click();

        expect(screen.getByText("Schedule for Fall-2022")).toBeInTheDocument();
    });
    test("Clicking the second SemesterBox displays a header for that specific semester", () => {
        const semester2 = screen.getByTestId("semester-Spring-2023");

        semester2.click();
        screen.getByTestId("plan-semester-button").click();

        expect(
            screen.getByText("Schedule for Spring-2023")
        ).toBeInTheDocument();
    });
});
