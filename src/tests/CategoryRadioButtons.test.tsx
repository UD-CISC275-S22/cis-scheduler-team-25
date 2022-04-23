import React from "react";
import { render, screen, within } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";

describe("CategoryRadioButtons Tests", () => {
    beforeEach(() => {
        render(<App />);
        screen.getByTestId("main-plan-button").click();
        screen.getByTestId("semester-Fall-2022").click();
        screen.getByTestId("plan-semester-button").click();
    });
    test("There are two radio buttons shown, one for General and one for Concentration", () => {
        const radios = screen.getAllByRole("radio");
        expect(radios).toHaveLength(2);

        screen.getByTestId("radio-General");
        screen.getByTestId("radio-Bioinformatics Concentration");
    });
    test("Expect General button to be checked and Concentration to be unchecked", () => {
        const radios = screen.getAllByRole("radio");

        expect(radios[0]).toBeChecked();
        expect(radios[1]).not.toBeChecked();
    });
    test("You can select a new category type and it changes courses displayed", () => {
        const radios = screen.getAllByRole("radio");
        const select = screen.getByTestId("requirement-list");
        const coursePool = screen.getByTestId("droppable-coursePool");

        userEvent.click(radios[1]);

        userEvent.selectOptions(select, "Organic Chemistry Sequence");
        expect(within(coursePool).queryAllByTestId(/draggable-/i)).toHaveLength(
            4
        );
    });
});
