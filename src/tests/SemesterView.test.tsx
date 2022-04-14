import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";

describe("SemesterView Tests", () => {
    beforeEach(() => {
        render(<App />);
        screen.getByTestId("main-plan-button").click();
        screen.getByTestId("semester-Fall-2022").click();
        screen.getByTestId("plan-semester-button").click();
    });
    test("Expect semester view text to display", () => {
        expect(screen.getByText(/Schedule for/i)).toBeInTheDocument();
    });
    test("There is a button for switching the view to degree plan", () => {
        const planButton = screen.getByTestId("semester-plan-button");
        planButton.click();
        expect(
            screen.queryByText("Schedule for Fall-2022")
        ).not.toBeInTheDocument();
    });
});
