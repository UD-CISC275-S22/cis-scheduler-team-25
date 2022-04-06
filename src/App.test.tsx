import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the course name somewhere", () => {
    render(<App />);
    const linkElement = screen.getByText(/UD-CIS-Scheduler/i);
    expect(linkElement).toBeInTheDocument();
});
