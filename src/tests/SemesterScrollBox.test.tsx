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
        expect(screen.getByText("F-2022")).toBeInTheDocument();
        expect(screen.getByText("S-2023")).toBeInTheDocument();
    });
    test("Each SemesterBox contains that semester's courses", () => {
        const semester1 = screen.getByTestId("semester-F2022");
        const semester2 = screen.getByTestId("semester-S2023");

        expect(within(semester1).getByText("1.108")).toBeInTheDocument();
        expect(within(semester1).getByText("1.181")).toBeInTheDocument();
        expect(within(semester1).getByText("2.241")).toBeInTheDocument();

        expect(within(semester2).getByText("3.123")).toBeInTheDocument();
        expect(within(semester2).getByText("1.181")).toBeInTheDocument();
        expect(within(semester2).getByText("2.242")).toBeInTheDocument();
    });
    test("Clicking the first SemesterBox displays a header for that specific semester", () => {
        const semester1 = screen.getByTestId("semester-F2022");

        semester1.click();

        expect(screen.getByText("Schedule for F-2022")).toBeInTheDocument();
    });
    test("Clicking the second SemesterBox displays a header for that specific semester", () => {
        const semester2 = screen.getByTestId("semester-S2023");

        semester2.click();

        expect(screen.getByText("Schedule for S-2023")).toBeInTheDocument();
    });
});
