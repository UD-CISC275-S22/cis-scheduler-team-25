import React, { useState } from "react";
import { DegreePlan } from "../interfaces/degreeplan";
import { Button, Modal } from "react-bootstrap";
import "./components.css";
import Collapsible from "react-collapsible";

export function ProgressList(): JSX.Element {
    return (
        <div>
            <Collapsible
                className="collapsible"
                trigger="View CISC Core Requirements"
            >
                <p>missing the following courses:</p>
            </Collapsible>
            <Collapsible
                className="collapsible"
                trigger="View Breadth Requirements"
            >
                <p>missing the following courses:</p>
            </Collapsible>
        </div>
    );
}
