import React from "react";
import { render, screen, within } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";

describe("RequirementSelector Tests", () => {
    beforeEach(() => {
        render(<App />);
        screen.getByTestId("main-plan-button").click();
        screen.getByTestId("semester-Fall-2022").click();
        screen.getByTestId("plan-semester-button").click();
    });
    test("There is a dropdown for selecting a requirement type", () => {
        expect(screen.getByTestId("requirement-list")).toBeInTheDocument();
        expect(screen.getByTestId("requirement-list")).toHaveLength(5);
    });
    test("You can select a new requirement type and it changes courses displayed", () => {
        const select = screen.getByTestId("requirement-list");
        const coursePool = screen.getByTestId("droppable-coursePool");

        userEvent.selectOptions(select, "Lab Requirements");
        expect(within(coursePool).queryAllByTestId(/draggable-/i)).toHaveLength(
            14
        );
    });
});
