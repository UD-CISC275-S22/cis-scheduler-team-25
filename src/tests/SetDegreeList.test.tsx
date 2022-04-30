import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";

describe("SetDegreeList Tests", () => {
    beforeEach(() => {
        render(<App />);
        screen.getByTestId("main-plan-button").click();
        screen.getByTestId("semester-Fall-2022").click();
    });
    test("There is a select box for concentrations", () => {
        expect(screen.getByTestId("concentration-list")).toBeInTheDocument();
        expect(screen.getByTestId("concentration-list")).toHaveLength(9);
    });
    test("Check that selecting a concentration changes the CategoryRadioButtons in SemesterView (Test 1)", () => {
        const select = screen.getByTestId("concentration-list");

        // select new conc and go to SemesterView
        userEvent.selectOptions(select, "Systems & Networks Concentration");
        screen.getByTestId("plan-semester-button").click();

        // new radio button for selected conc should appear
        screen.getByTestId("radio-Systems & Networks Concentration");
    });
    test("Check that selecting a concentration changes the CategoryRadioButtons in SemesterView (Test 2)", () => {
        const select = screen.getByTestId("concentration-list");

        // select new conc and go to SemesterView
        userEvent.selectOptions(
            select,
            "Theory & Computation (Discrete Track) Concentration"
        );
        screen.getByTestId("plan-semester-button").click();

        // new radio button for selected conc should appear
        screen.getByTestId(
            "radio-Theory & Computation (Discrete Track) Concentration"
        );
    });
});
