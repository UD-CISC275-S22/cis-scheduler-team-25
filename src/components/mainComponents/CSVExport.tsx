import React from "react";
import { Button } from "react-bootstrap";
import { DegreePlan } from "../../interfaces/degreeplan";
import { usePlanContext } from "../context/PlanContext";
import { planToCSV } from "../mainComponents/utils/CSVUtils";

function downloadPlan(currentPlan: DegreePlan) {
    // apply column header to CSV
    const csvContent = planToCSV(currentPlan);

    const blob = new Blob([csvContent], {
        type: "text/csv;charset=utf-8;"
    });

    // create downloadable url
    const url = URL.createObjectURL(blob);

    // Create a link to download it
    const pom = document.createElement("a");
    pom.href = url;
    pom.setAttribute("download", currentPlan.name + ".csv");
    pom.click();
}

export function CSVExport(): JSX.Element {
    const { currentPlan } = usePlanContext();
    return (
        <div>
            <Button
                disabled={currentPlan.id === -1}
                data-testid="CSV-export-button"
                onClick={() => downloadPlan(currentPlan)}
            >
                Download Selected Degree Plan
            </Button>
        </div>
    );
}
