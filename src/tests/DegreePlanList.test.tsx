import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe("DegreePlanList Tests", () => {
    beforeEach(() => {
        render(<App />);
    });
    test("There is a select box", () => {
        expect(screen.getByRole("combobox")).toBeInTheDocument();
        expect(screen.getByRole("combobox")).toHaveLength(2);
    });
    test("You can select the test plan length displays", () => {
        const select = screen.getByRole("combobox");

        userEvent.selectOptions(select, "Test");
        expect(screen.getByText("0 Questions")).toBeInTheDocument();

        userEvent.selectOptions(select, "Test2");
        expect(screen.getByText("1 Questions")).toBeInTheDocument();
    });
});
