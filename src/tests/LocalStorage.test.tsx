import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";

describe("NavBar Save Changes Tests", () => {
    beforeEach(() => {
        render(<App />);
    });
    test("There is a NavBar button for saving current changes", () => {
        screen.getByText(/Save Current Changes/i);
    });
    test("Clicking the save button brings up a text modal", () => {
        screen.getByText(/Save Current Changes/i).click();
        screen.getByText(/Your plans have been successfully saved!/i);
        screen.getByTestId("save-close-button").click();
    });
});
