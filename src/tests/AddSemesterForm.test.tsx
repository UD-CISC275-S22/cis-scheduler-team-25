import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";

describe("Add Semester Form Tests", () => {
    beforeEach(() => {
        render(<App />);
        const planButton = screen.getByTestId("main-plan-button");
        planButton.click();
    });
    test("There is a button for adding a semester, which toggles the AddSemesterForm to show", () => {
        const addSemButton = screen.getByTestId("add-semester-button");

        expect(screen.queryByTestId("semester-add-confirm-button")).not
            .toBeInTheDocument;
        expect(screen.queryByTestId("semester-add-season")).not
            .toBeInTheDocument;
        expect(screen.queryByTestId("semester-add-year")).not.toBeInTheDocument;

        addSemButton.click();

        expect(screen.queryByTestId("semester-add-confirm-button"))
            .toBeInTheDocument;
        expect(screen.queryByTestId("semester-add-season")).toBeInTheDocument;
        expect(screen.queryByTestId("semester-add-year")).toBeInTheDocument;
    });
    test("The confirm button is default disabled", () => {
        screen.getByTestId("add-semester-button").click();

        const confirmButton = screen.getByTestId("semester-add-confirm-button");
        expect(confirmButton).toBeDisabled();
    });
    test("You can enter values into the add semester year textbox", () => {
        screen.getByTestId("add-semester-button").click();

        const confirmButton = screen.getByTestId("semester-add-confirm-button");
        const yearTextBox = screen.getByTestId("semester-add-year");

        userEvent.type(yearTextBox, "2023");
        confirmButton.click();

        expect(screen.getByText("Fall-2022")).toBeInTheDocument();
    });
    test("You can enter values and select a season to the add semester year fields", () => {
        screen.getByTestId("add-semester-button").click();

        const confirmButton = screen.getByTestId("semester-add-confirm-button");
        const yearTextBox = screen.getByTestId("semester-add-year");
        const seasonSelect = screen.getByTestId("semester-add-season");

        userEvent.selectOptions(seasonSelect, "Spring");
        userEvent.type(yearTextBox, "2025");
        confirmButton.click();

        expect(screen.getByText("Spring-2025")).toBeInTheDocument();
    });
    test("Expect confirm button to be disabled when add fields already exist in that plan", () => {
        screen.getByTestId("add-semester-button").click();

        const confirmButton = screen.getByTestId("semester-add-confirm-button");
        const yearTextBox = screen.getByTestId("semester-add-year");
        const seasonSelect = screen.getByTestId("semester-add-season");

        userEvent.selectOptions(seasonSelect, "Spring");
        userEvent.type(yearTextBox, "2023");

        expect(confirmButton).toBeDisabled();
    });
});
