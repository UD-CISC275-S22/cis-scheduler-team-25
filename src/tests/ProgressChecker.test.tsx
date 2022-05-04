import React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe("ProgressChecker Tests", () => {
    beforeEach(() => {
        render(<App />);
        screen.getByTestId("main-plan-button").click();
    });
    test("There is a view progress button", () => {
        const progButton = screen.getByTestId("view-progress-button");
        expect(progButton).toBeInTheDocument();
    });
    test("Core requirements are visible", () => {
        screen.getByTestId("view-progress-button").click();
        const collapsible = screen.getByTestId("collapsible-General-CISC Core");
        expect(within(collapsible).getByText("CISC 220")).toBeInTheDocument();
        expect(within(collapsible).getByText("CISC 260")).toBeInTheDocument();
        expect(within(collapsible).getByText("CISC 275")).toBeInTheDocument();
        expect(within(collapsible).getByText("CISC 303")).toBeInTheDocument();
        expect(within(collapsible).getByText("CISC 320")).toBeInTheDocument();
        expect(within(collapsible).getByText("MATH 210")).toBeInTheDocument();
    });
    test("Lab requirements are visible", () => {
        screen.getByTestId("view-progress-button").click();
        const collapsible = screen.getByTestId(
            "collapsible-General-Lab Requirements"
        );
        expect(within(collapsible).getByText("BISC 207")).toBeInTheDocument();
        expect(within(collapsible).getByText("BISC 208")).toBeInTheDocument();
        expect(within(collapsible).getByText("CHEM 103")).toBeInTheDocument();
        expect(within(collapsible).getByText("CHEM 133")).toBeInTheDocument();
        expect(within(collapsible).getByText("CHEM 104")).toBeInTheDocument();
        expect(within(collapsible).getByText("CHEM 134")).toBeInTheDocument();
        expect(within(collapsible).getByText("GEOL 105")).toBeInTheDocument();
        expect(within(collapsible).getByText("GEOL 115")).toBeInTheDocument();
        //expect(within(collapsible).getByText("GEOL 107")).toBeInTheDocument();
        //2 GEOL 107s
        expect(within(collapsible).getByText("GEOL 110")).toBeInTheDocument();
        expect(within(collapsible).getByText("PHYS 207")).toBeInTheDocument();
        expect(within(collapsible).getByText("GEOL 110")).toBeInTheDocument();
        expect(within(collapsible).getByText("PHYS 207")).toBeInTheDocument();
        expect(within(collapsible).getByText("PHYS 227")).toBeInTheDocument();
        expect(within(collapsible).getByText("PHYS 208")).toBeInTheDocument();
        expect(within(collapsible).getByText("PHYS 228")).toBeInTheDocument();
    });
    test("Writing requirements are visible", () => {
        screen.getByTestId("view-progress-button").click();
        const collapsible = screen.getByTestId(
            "collapsible-General-Writing Requirements"
        );
        expect(within(collapsible).getByText("ENGL 110")).toBeInTheDocument();
        expect(within(collapsible).getByText("ENGL 312")).toBeInTheDocument();
        expect(within(collapsible).getByText("ENGL 410")).toBeInTheDocument();
        expect(within(collapsible).getByText("CISC 355")).toBeInTheDocument();
    });
    test("Capstone requirements are visible", () => {
        screen.getByTestId("view-progress-button").click();
        const collapsible = screen.getByTestId("collapsible-General-Capstone");
        expect(within(collapsible).getByText("CISC 498")).toBeInTheDocument();
        expect(within(collapsible).getByText("CISC 499")).toBeInTheDocument();
        expect(within(collapsible).getByText("UNIV 401")).toBeInTheDocument();
        expect(within(collapsible).getByText("UNIV 402")).toBeInTheDocument();
    });
    test("First year seminar requirements are visible", () => {
        screen.getByTestId("view-progress-button").click();
        const collapsible = screen.getByTestId(
            "collapsible-General-First Year Seminar"
        );
        expect(within(collapsible).getByText("EGGG 101")).toBeInTheDocument();
        expect(within(collapsible).getByText("UNIV 101")).toBeInTheDocument();
    });

    //checking concentration requirements (BIOINFORMATICS)
    test("(BioInformatics) Concentration requirements are visible", () => {
        const select = screen.getByTestId("concentration-list");

        // select new conc
        userEvent.selectOptions(select, "Bioinformatics Concentration");
        screen.getByTestId("view-progress-button").click();
        const collapsible = screen.getByTestId(
            "collapsible-Bioinformatics Concentration-Concentration Requirements"
        );
        expect(within(collapsible).getByText("BISC 207")).toBeInTheDocument();
        expect(within(collapsible).getByText("BISC 208")).toBeInTheDocument();
        expect(within(collapsible).getByText("BISC 401")).toBeInTheDocument();
        expect(within(collapsible).getByText("CHEM 103")).toBeInTheDocument();
        expect(within(collapsible).getByText("CHEM 133")).toBeInTheDocument();
        expect(within(collapsible).getByText("CHEM 104")).toBeInTheDocument();
        expect(within(collapsible).getByText("CHEM 134")).toBeInTheDocument();
        expect(within(collapsible).getByText("CISC 372")).toBeInTheDocument();
        expect(within(collapsible).getByText("CISC 436")).toBeInTheDocument();
        expect(within(collapsible).getByText("MATH 349")).toBeInTheDocument();
    });
    test("(BioInformatics) Organic Chemistry Sequence visible", () => {
        const select = screen.getByTestId("concentration-list");

        // select conc
        userEvent.selectOptions(select, "Bioinformatics Concentration");
        screen.getByTestId("view-progress-button").click();
        const collapsible = screen.getByTestId(
            "collapsible-Bioinformatics Concentration-Organic Chemistry Sequence"
        );
        expect(within(collapsible).getByText("CHEM 213")).toBeInTheDocument();
        expect(within(collapsible).getByText("CHEM 215")).toBeInTheDocument();
        expect(within(collapsible).getByText("CHEM 321")).toBeInTheDocument();
        expect(within(collapsible).getByText("CHEM 325")).toBeInTheDocument();
    });
    test("(BioInformatics) Probability/Statistics Requirements visible", () => {
        const select = screen.getByTestId("concentration-list");

        // select conc
        userEvent.selectOptions(select, "Bioinformatics Concentration");
        screen.getByTestId("view-progress-button").click();
        const collapsible = screen.getByTestId(
            "collapsible-Bioinformatics Concentration-Probability/Statistics Requirement"
        );
        expect(within(collapsible).getByText("MATH 205")).toBeInTheDocument();
        expect(within(collapsible).getByText("MATH 350")).toBeInTheDocument();
    });
    test("(BioInformatics) Data Analysis Requirement visible", () => {
        const select = screen.getByTestId("concentration-list");

        // select conc
        userEvent.selectOptions(select, "Bioinformatics Concentration");
        screen.getByTestId("view-progress-button").click();
        const collapsible = screen.getByTestId(
            "collapsible-Bioinformatics Concentration-Data Analysis Requirement"
        );
        expect(within(collapsible).getByText("CISC 483")).toBeInTheDocument();
        expect(within(collapsible).getByText("CISC 484")).toBeInTheDocument();
    });
    test("(BioInformatics) Restricted Electives visible", () => {
        const select = screen.getByTestId("concentration-list");

        // select conc
        userEvent.selectOptions(select, "Bioinformatics Concentration");
        screen.getByTestId("view-progress-button").click();
        const collapsible = screen.getByTestId(
            "collapsible-Bioinformatics Concentration-Restricted Electives"
        );
        expect(within(collapsible).getByText("ANFS 300")).toBeInTheDocument();
        expect(within(collapsible).getByText("ANFS 310")).toBeInTheDocument();
        expect(within(collapsible).getByText("ANFS 470")).toBeInTheDocument();
        expect(within(collapsible).getByText("BISC 403")).toBeInTheDocument();
        expect(within(collapsible).getByText("BISC 484")).toBeInTheDocument();
        expect(within(collapsible).getByText("BISC 492")).toBeInTheDocument();
        expect(within(collapsible).getByText("CHEM 214")).toBeInTheDocument();
        expect(within(collapsible).getByText("CHEM 216")).toBeInTheDocument();
        expect(within(collapsible).getByText("CHEM 322")).toBeInTheDocument();
        expect(within(collapsible).getByText("CHEM 326")).toBeInTheDocument();
        expect(within(collapsible).getByText("MATH 243")).toBeInTheDocument();
    });

    //check other concentration
    test("(Data Science) Concentration requirements are visible", () => {
        const select = screen.getByTestId("concentration-list");

        // select new conc
        userEvent.selectOptions(select, "Data Science Concentration");
        screen.getByTestId("view-progress-button").click();
        const collapsible = screen.getByTestId(
            "collapsible-Data Science Concentration-Concentration Requirements"
        );
        expect(within(collapsible).getByText("CISC 304")).toBeInTheDocument();
        expect(within(collapsible).getByText("CISC 372")).toBeInTheDocument();
        expect(within(collapsible).getByText("CISC 437")).toBeInTheDocument();
        expect(within(collapsible).getByText("CISC 481")).toBeInTheDocument();
        expect(within(collapsible).getByText("MATH 205")).toBeInTheDocument();
        expect(within(collapsible).getByText("MATH 243")).toBeInTheDocument();
        expect(within(collapsible).getByText("MATH 349")).toBeInTheDocument();
    });
    test("(Data Science) Concentration requirements are visible", () => {
        const select = screen.getByTestId("concentration-list");

        // select conc
        userEvent.selectOptions(select, "Data Science Concentration");
        screen.getByTestId("view-progress-button").click();
        const collapsible = screen.getByTestId(
            "collapsible-Data Science Concentration-Advanced Data Science"
        );
        expect(within(collapsible).getByText("CISC 483")).toBeInTheDocument();
        expect(within(collapsible).getByText("CISC 484")).toBeInTheDocument();
    });
    test("(Data Science) Concentration requirements are visible", () => {
        const select = screen.getByTestId("concentration-list");

        // select conc
        userEvent.selectOptions(select, "Data Science Concentration");
        screen.getByTestId("view-progress-button").click();
        const collapsible = screen.getByTestId(
            "collapsible-Data Science Concentration-Advanced Math"
        );
        expect(within(collapsible).getByText("MATH 302")).toBeInTheDocument();
        expect(within(collapsible).getByText("MATH 350")).toBeInTheDocument();
        expect(within(collapsible).getByText("MATH 426")).toBeInTheDocument();
    });
    test("(Data Science) Concentration requirements are visible", () => {
        const select = screen.getByTestId("concentration-list");

        // select conc
        userEvent.selectOptions(select, "Data Science Concentration");
        screen.getByTestId("view-progress-button").click();
        const collapsible = screen.getByTestId(
            "collapsible-Data Science Concentration-Restricted Electives"
        );
        expect(within(collapsible).getByText("CISC 361")).toBeInTheDocument();
        expect(within(collapsible).getByText("CISC 410")).toBeInTheDocument();
        expect(within(collapsible).getByText("CISC 436")).toBeInTheDocument();
        expect(within(collapsible).getByText("CISC 440")).toBeInTheDocument();
        expect(within(collapsible).getByText("CISC 442")).toBeInTheDocument();
        expect(within(collapsible).getByText("CISC 449")).toBeInTheDocument();
        expect(within(collapsible).getByText("CISC 450")).toBeInTheDocument();
        expect(within(collapsible).getByText("CISC 471")).toBeInTheDocument();
        expect(within(collapsible).getByText("CISC 474")).toBeInTheDocument();
        expect(within(collapsible).getByText("CISC 483")).toBeInTheDocument();
        expect(within(collapsible).getByText("CISC 484")).toBeInTheDocument();
        expect(within(collapsible).getByText("CISC 489")).toBeInTheDocument();
        expect(within(collapsible).getByText("ELEG 387")).toBeInTheDocument();
        expect(within(collapsible).getByText("ELEG 487")).toBeInTheDocument();
        expect(within(collapsible).getByText("MATH 302")).toBeInTheDocument();
        expect(within(collapsible).getByText("MATH 350")).toBeInTheDocument();
        expect(within(collapsible).getByText("MATH 428")).toBeInTheDocument();
        expect(within(collapsible).getByText("MATH 450")).toBeInTheDocument();
    });
});
