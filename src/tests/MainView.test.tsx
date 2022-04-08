import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";

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
});
