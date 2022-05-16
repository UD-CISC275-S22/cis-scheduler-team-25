import React from "react";
import "../components.css";

type AlertMessageProps = {
    status: string;
    alertActive: boolean;
    setAlertActive: (newShowing: boolean) => void;
};

function getStatusMessage(status: string): string {
    switch (status) {
        case "addSuccess":
            return "Course successfully added to semester.";
        case "removeSuccess":
            return "Course successfully removed from semester.";
        case "swapSuccess":
            return "Course order successfully swapped.";
        case "preReqError":
            return "Error! You do not meet the prerequesites to add this course.";
        case "courseAutoCompleteSuccess":
            return "Potential Courses Pool has been successfully updated.";
        default:
            return "You cannot perform that action.";
    }
}

function getStatusColor(status: string): string {
    switch (status) {
        case "addSuccess":
        case "removeSuccess":
        case "swapSuccess":
        case "courseAutoCompleteSuccess":
            return "#bbffaf";
        case "preReqError":
            return "#ffafaf";
        default:
            return "#ffdfaf";
    }
}

export function AlertMessage({
    status,
    alertActive,
    setAlertActive
}: AlertMessageProps): JSX.Element {
    return (
        <div
            className={alertActive ? "alert-shown" : "alert-hidden"}
            onTransitionEnd={() => setAlertActive(false)}
            style={{ backgroundColor: getStatusColor(status) }}
        >
            {getStatusMessage(status)}
        </div>
    );
}
