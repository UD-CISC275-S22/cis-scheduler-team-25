import React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe("ProgressChecker Tests", () => {
    beforeEach(() => {
        render(<App />);
        screen.getByTestId("main-plan-button").click();
    });
    test("There is a view progress button", () => {
        const progButton = screen.getByTestId("view-progress-button");
        expect(progButton).toBeInTheDocument();
    });
    test("General requirement are visible", () => {
        screen.getByTestId("view-progress-button").click();
        const collapsible = screen.getByTestId("collapsible-General-CISC Core");
        expect(within(collapsible).getByText("CISC 220")).toBeInTheDocument();
    });
});
