import React from "react";
import { render, screen, within } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";

describe("CourseAutoComplete Tests", () => {
    beforeEach(() => {
        render(<App />);
        screen.getByTestId("main-plan-button").click();
        screen.getByTestId("semester-Fall-2022").click();
        screen.getByTestId("plan-semester-button").click();
    });
    test("Expect a course autocomplete field and button to exist", () => {
        screen.getByTestId("add-autocomplete-course-button");
        screen.getByTestId("course-autocomplete");
    });
    test("Expect a course autocomplete to render suggestions", () => {
        const auto = screen.getByTestId("course-autocomplete");

        // Expect 4 suggestions to appear
        userEvent.type(auto, "{selectall}CISC 10");
        expect(screen.queryAllByTestId(/suggestion-/i)).toHaveLength(4);

        // Expect 2 suggestions to appear
        userEvent.type(auto, "{selectall}MATH 22");
        expect(screen.queryAllByTestId(/suggestion-/i)).toHaveLength(2);
    });
    test("Expect a course add button to only be enabled when valid input is written", () => {
        const auto = screen.getByTestId("course-autocomplete");
        const addButton = screen.getByTestId("add-autocomplete-course-button");

        expect(addButton).toBeDisabled();

        userEvent.type(auto, "{selectall}CISC 10");
        expect(screen.queryAllByTestId(/suggestion-/i)).toHaveLength(4);
        expect(addButton).toBeDisabled();

        // Expect 2 suggestions to appear
        userEvent.type(auto, "{selectall}MATH 010");
        expect(addButton).toBeEnabled();
    });
    test("Expect a course suggestions to be clickable and autocompletes when clicked", () => {
        const auto = screen.getByTestId("course-autocomplete");
        const addButton = screen.getByTestId("add-autocomplete-course-button");

        expect(addButton).toBeDisabled();

        userEvent.type(auto, "{selectall}CISC 10");
        screen.getByTestId("suggestion-CISC 101").click();

        expect(addButton).toBeEnabled();
        expect(auto).toHaveValue("CISC 101");
    });
    test("Expect a valid course to be addable and change the potential course pool", () => {
        const auto = screen.getByTestId("course-autocomplete");
        const addButton = screen.getByTestId("add-autocomplete-course-button");

        userEvent.type(auto, "{selectall}CISC 101");
        addButton.click();
        expect(screen.getByTestId("draggable-CISC 101")).toBeInTheDocument();
    });
    test("Expect an added autocomplete course to appear in the course pool", () => {
        const auto = screen.getByTestId("course-autocomplete");
        const addButton = screen.getByTestId("add-autocomplete-course-button");

        expect(addButton).toBeDisabled();

        userEvent.type(auto, "{selectall}CISC 101");
        addButton.click();

        const coursePool = screen.getByTestId("droppable-coursePool");
        expect(
            within(coursePool).getByTestId("draggable-CISC 101")
        ).toBeInTheDocument();

        screen.getByTestId("radio-Custom Category").click();
        const coursePool2 = screen.getByTestId("droppable-coursePool");
        expect(
            within(coursePool2).getByTestId("draggable-CISC 101")
        ).toBeInTheDocument();
    });
});
