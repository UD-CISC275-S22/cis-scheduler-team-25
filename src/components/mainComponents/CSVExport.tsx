import React from "react";
import { Button } from "react-bootstrap";
import { CSVLink } from "react-csv";
import { DegreePlan } from "../../interfaces/degreeplan";
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

export function CSVExport({
    currentPlan
}: {
    currentPlan: DegreePlan;
}): JSX.Element {
    return (
        <div>
            <Button
                disabled={currentPlan.id === -1}
                onClick={() => downloadPlan(currentPlan)}
            >
                Download Selected Degree Plan
            </Button>
        </div>
    );
}
