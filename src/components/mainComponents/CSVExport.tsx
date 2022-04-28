import React from "react";
import { CSVLink } from "react-csv";
import { DegreePlan } from "../../interfaces/degreeplan";

export function CSVExport({ plans }: { plans: DegreePlan[] }): JSX.Element {
    const csvData = plans;
    const csvHeaders = [
        { label: "ID", key: "id" },
        { label: "Name", key: "name" },
        { label: "Semesters", key: "semesters" },
        { label: "Courses", key: "semesters.courses" },
        { label: "Length", key: "length" }
    ];

    return (
        <div>
            <div style={{ border: "solid 00539F" }}></div>
            <br></br>
            <div>
                <CSVLink
                    style={{ fontSize: "12px" }}
                    data={csvData}
                    headers={csvHeaders}
                    filename={"degreeplan.csv"}
                >
                    Click to Download Degree Plans
                </CSVLink>
            </div>
        </div>
    );
}
