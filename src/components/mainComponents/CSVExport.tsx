import React from "react";
import { Button } from "react-bootstrap";
import { CSVLink } from "react-csv";
import { DegreePlan } from "../../interfaces/degreeplan";
import { planToCSV } from "../planComponents/CurrentPlanExport";

function getDownloadLink(currentPlan: DegreePlan): string {
    const header =
        "Semester,Course Code,Course Name,Description,Credits,Prerequisites,Prequesite Description,Restrictions,Breadth Details,Typical Availability,Degree Requirements\n";

    const csvContent = header + planToCSV(currentPlan);

    console.log(csvContent);

    const blob = new Blob([csvContent], {
        type: "text/csv;charset=utf-8;"
    });

    return URL.createObjectURL(blob);
}

export function CSVExport({
    currentPlan
}: {
    currentPlan: DegreePlan;
}): JSX.Element {
    return (
        <div>
            <Button>
                <a
                    href={getDownloadLink(currentPlan)}
                    download={currentPlan.name + ".csv"}
                >
                    Download Selected Degree Plan
                </a>
            </Button>
        </div>
    );
}
