import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { DegreePlan } from "../../interfaces/degreeplan";
import { usePlanContext } from "../context/PlanContext";
import { addImportToPlans } from "./utils/CSVUtils";

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
                data-testid="CSV-import-button"
                disabled={content === "" || content === "Data cannot be loaded"}
                onClick={() => addImportToPlans(content, plans, setPlans)}
            >
                Upload CSV ⬆
            </Button>
        </div>
    );
}

export function CSVImport(): JSX.Element {
    const { plans, setPlans } = usePlanContext();
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
<<<<<<< HEAD
                    <div
                    // style={{
                    //     width: "500px",
                    //     justifyContent: "center",
                    //     alignItems: "center"
                    // }}
                    >
                        <Form.Control type="file" onChange={uploadFile} />
                    </div>
=======
                    <Form.Control
                        data-testid="CSV-file-bar"
                        type="file"
                        onChange={uploadFile}
                        className="download-bar"
                    />
>>>>>>> 57e70213fe14fca2b2cced41f8f26b4e140aa11f
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
