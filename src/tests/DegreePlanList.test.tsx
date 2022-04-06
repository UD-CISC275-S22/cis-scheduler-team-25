import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe("DegreePlanList Tests", () => {
    beforeEach(() => {
        render(<App />);
    });
    test("There is a select box", () => {
        expect(screen.getByTestId("plan-list")).toBeInTheDocument();
        expect(screen.getByTestId("plan-list")).toHaveLength(2);
    });
    test("You can select the test plan length displays", () => {
        const select = screen.getByTestId("plan-list");

        userEvent.selectOptions(select, "Test");
        expect(screen.getByText("0 Semesters Included")).toBeInTheDocument();

        userEvent.selectOptions(select, "Test2");
        expect(screen.getByText("1 Semesters Included")).toBeInTheDocument();
    });
});
