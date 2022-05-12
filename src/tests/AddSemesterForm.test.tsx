import React from "react";
import { render, screen, within } from "@testing-library/react";
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
    test("The confirm button is default enabled", () => {
        screen.getByTestId("add-semester-button").click();

        const confirmButton = screen.getByTestId("semester-add-confirm-button");
        expect(confirmButton).toBeEnabled();
    });
    test("You can enter values into the add semester year textbox", () => {
        screen.getByTestId("add-semester-button").click();

        const confirmButton = screen.getByTestId("semester-add-confirm-button");
        const yearTextBox = screen.getByTestId("semester-add-year");

        userEvent.type(yearTextBox, "{selectall}2023");
        confirmButton.click();

        expect(screen.getByText("Fall-2022")).toBeInTheDocument();
    });
    test("You can enter values and select a season to the add semester year fields", () => {
        screen.getByTestId("add-semester-button").click();

        const confirmButton = screen.getByTestId("semester-add-confirm-button");
        const yearTextBox = screen.getByTestId("semester-add-year");
        const seasonSelect = screen.getByTestId("semester-add-season");

        userEvent.selectOptions(seasonSelect, "Spring");
        userEvent.type(yearTextBox, "{selectall}2025");
        expect(confirmButton).toBeEnabled();
        confirmButton.click();

        screen.getByTestId("semester-Spring-2023");
        // expect(screen.getByTestId("semester-Spring-2025")).toBeInTheDocument();
    });
    test("Expect confirm button to be disabled when add fields already exist in that plan", () => {
        screen.getByTestId("add-semester-button").click();

        const confirmButton = screen.getByTestId("semester-add-confirm-button");
        const yearTextBox = screen.getByTestId("semester-add-year");
        const seasonSelect = screen.getByTestId("semester-add-season");

        userEvent.selectOptions(seasonSelect, "Spring");
        userEvent.type(yearTextBox, "{selectall}2023");

        expect(confirmButton).toBeDisabled();
    });
    test("Expect confirm button to be disabled when year is outside the range 1900 < year < 2200", () => {
        screen.getByTestId("add-semester-button").click();

        const confirmButton = screen.getByTestId("semester-add-confirm-button");
        const yearTextBox = screen.getByTestId("semester-add-year");
        const seasonSelect = screen.getByTestId("semester-add-season");

        userEvent.selectOptions(seasonSelect, "Spring");

        // year is below the limit
        userEvent.type(yearTextBox, "{selectall}1800");
        expect(confirmButton).toBeDisabled();

        // year is above the limit
        userEvent.type(yearTextBox, "{selectall}2800");
        expect(confirmButton).toBeDisabled();
    });
    test("Added semesters are automatically sorted", () => {
        screen.getByTestId("add-semester-button").click();

        const confirmButton = screen.getByTestId("semester-add-confirm-button");
        const yearTextBox = screen.getByTestId("semester-add-year");
        const seasonSelect = screen.getByTestId("semester-add-season");

        userEvent.selectOptions(seasonSelect, "Winter");
        userEvent.type(yearTextBox, "{selectall}2023");
        confirmButton.click();

        // use regex to get the ListGroup.Item in SemesterScrollBox,
        // if sorting is correct, Winter 2023 should be between
        // Fall 2022 and Spring 2023
        const listItems = screen.getAllByTestId(/semester-.*-..../i);
        expect(
            within(listItems[1]).getByText("Winter-2023")
        ).toBeInTheDocument();
    });
    test("Add button automatically increments default information", () => {
        const addButton = screen.getByTestId("add-semester-button");
        addButton.click();

        const confirmButton = screen.getByTestId("semester-add-confirm-button");
        const yearTextBox = screen.getByTestId("semester-add-year");
        const seasonSelect = screen.getByTestId("semester-add-season");

        expect(yearTextBox).toHaveValue(2023);
        expect(seasonSelect).toHaveValue("Fall");
        confirmButton.click();

        addButton.click();
        const yearTextBox2 = screen.getByTestId("semester-add-year");
        const seasonSelect2 = screen.getByTestId("semester-add-season");
        expect(yearTextBox2).toHaveValue(2024);
        expect(seasonSelect2).toHaveValue("Spring");
    });
});
