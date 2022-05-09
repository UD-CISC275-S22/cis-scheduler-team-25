import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { DegreePlan } from "../../interfaces/degreeplan";
import { CSVToPlan } from "./utils/CSVUtils";

type CSVImportProps = {
    plans: DegreePlan[];
    setPlans: (newPlans: DegreePlan[]) => void;
};

type ImportContentButtonProps = {
    plans: DegreePlan[];
    setPlans: (newPlans: DegreePlan[]) => void;
    content: string;
};

function ImportContentButton({
    plans,
    setPlans,
    content
}: ImportContentButtonProps): JSX.Element {
    return (
        <div>
            <Button
                disabled={content === "" || content === "Data cannot be loaded"}
                onClick={() => CSVToPlan(content, plans, setPlans)}
            >
                Use Imported CSV
            </Button>
        </div>
    );
}

export function CSVImport({ plans, setPlans }: CSVImportProps): JSX.Element {
    const [content, setContent] = useState<string>("");

    function uploadFile(event: React.ChangeEvent<HTMLInputElement>) {
        // Might have removed the file, need to check that the files exist
        if (event.target.files && event.target.files.length) {
            // Get the first filename
            const file = event.target.files[0];

            if (file.name.slice(-4) !== ".csv") {
                console.log("Uploaded file is not a .csv");
                setContent("");
            }

            // Create a reader
            const reader = new FileReader();
            // Create lambda callback to handle when we read the file
            reader.onload = (loadEvent) => {
                // Target might be null, so provide default error value
                const newContent =
                    loadEvent.target?.result || "Data cannot be loaded";
                // FileReader provides string or ArrayBuffer, force it to be string
                setContent(newContent as string);
            };

            // Actually read the file
            reader.readAsText(file, "utf-8");
        }
    }

    return (
        <div>
            <div>
                <Form.Group controlId="exampleForm">
                    <Form.Label>Upload a file</Form.Label>
                    <Form.Control type="file" onChange={uploadFile} />
                </Form.Group>
            </div>
            <ImportContentButton
                plans={plans}
                setPlans={setPlans}
                content={content}
            />
        </div>
    );
}
