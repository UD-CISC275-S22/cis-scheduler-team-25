import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";

describe("HelpBar Tests", () => {
    beforeEach(() => {
        render(<App />);
        screen.getByTestId("help-close-button").click();
    });
    test("Expect help bar to display", () => {
        expect(
            screen.getByTestId("nav-drop-How to Use the Scheduler")
        ).toBeInTheDocument();
    });
    test("Introduction help button shows appropriate text", () => {
        const howToButton = screen.getByTestId(
            "nav-drop-How to Use the Scheduler"
        );
        howToButton.click();

        expect(screen.getByTestId("HelpIntroView")).toBeInTheDocument();
    });
    test("Managing Degree Plans help button shows appropriate text", () => {
        // get NavBar "How to Use the Scheduler" html element
        const howToUse = screen
            .getAllByText("How to Use the Scheduler")
            .filter(
                (e: HTMLElement): boolean => e.getAttribute("role") === "button"
            )[0];

        // click NavBar button to show dropdown choices and click one
        howToUse.click();
        screen.getByText("Managing Your Degree Plans").click();

        // expect helpModal to appear and have correct text
        const modal = screen.getByTestId("helpModal");
        expect(modal).toHaveTextContent("Managing Your Degree Plans");
    });
    test("Selecting Semesters in a Plan help button shows appropriate text", () => {
        // get NavBar "How to Use the Scheduler" html element
        const howToUse = screen
            .getAllByText("How to Use the Scheduler")
            .filter(
                (e: HTMLElement): boolean => e.getAttribute("role") === "button"
            )[0];

        // click NavBar button to show dropdown choices and click one
        howToUse.click();
        screen.getByText("Selecting Semesters in a Plan").click();

        // expect helpModal to appear and have correct text
        const modal = screen.getByTestId("helpModal");
        expect(modal).toHaveTextContent("Selecting Semesters in a Plan");
    });
    test("Editing Semesters with Course Drag and Drop help button shows appropriate text", () => {
        // get NavBar "How to Use the Scheduler" html element
        const howToUse = screen
            .getAllByText("How to Use the Scheduler")
            .filter(
                (e: HTMLElement): boolean => e.getAttribute("role") === "button"
            )[0];

        // click NavBar button to show dropdown choices and click one
        howToUse.click();
        screen.getByText("Editing Semesters with Course Drag and Drop").click();

        // expect helpModal to appear and have correct text
        const modal = screen.getByTestId("helpModal");
        expect(modal).toHaveTextContent(
            "Editing Semesters with Course Drag and Drop"
        );
    });
    test("Using the Course Viewer, Editor, and Transfer help button shows appropriate text", () => {
        // get NavBar "How to Use the Scheduler" html element
        const howToUse = screen
            .getAllByText("How to Use the Scheduler")
            .filter(
                (e: HTMLElement): boolean => e.getAttribute("role") === "button"
            )[0];

        // click NavBar button to show dropdown choices and click one
        howToUse.click();
        screen
            .getByText("Using the Course Viewer, Editor, and Transfer")
            .click();

        // expect helpModal to appear and have correct text
        const modal = screen.getByTestId("helpModal");
        expect(modal).toHaveTextContent(
            "Using the Course Viewer, Editor, and Transfer"
        );
    });
    test("Using the Saving Your Changes help button shows appropriate text", () => {
        // get NavBar "How to Use the Scheduler" html element
        const howToUse = screen
            .getAllByText("How to Use the Scheduler")
            .filter(
                (e: HTMLElement): boolean => e.getAttribute("role") === "button"
            )[0];

        // click NavBar button to show dropdown choices and click one
        howToUse.click();
        screen.getByText("Saving Your Changes").click();

        // expect helpModal to appear and have correct text
        const modal = screen.getByTestId("helpModal");
        expect(modal).toHaveTextContent("Saving Your Changes");
    });
});
