import React from "react";
import { render, screen, within } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";

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

        // screen.getByRole("nav-drop-Introduction").click();

        expect(screen.getByTestId("HelpIntroView")).toBeInTheDocument();
    });
    test("Managing Degree Plans help button shows appropriate text", () => {
        const howToUse = screen.getByTestId(
            "nav-drop-How to Use the Scheduler"
        );
        userEvent.click(howToUse);
        // expect(howToUse.querySelectorAll("a")).toHaveLength(5);

        const test = within(howToUse).getAllByRole("button")[0];
        test.setAttribute("aria-expanded", "true");
        console.log(test);
        expect(document.querySelectorAll("a")).toHaveLength(5);
        // test.click();
        // expect(within(test).queryAllByRole("button")).toHaveLength(5);
        // expect(within(howToUse).getAllByRole("button")).toHaveLength(5);
        // expect(howToUse.childElementCount).toBe(5);
        // screen.getByTestId("nav-drop-Managing Your Degree Plans").click();

        // expect(screen.getByTestId("HelpIntroView")).toBeInTheDocument();
    });
});
