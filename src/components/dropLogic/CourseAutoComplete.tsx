import React from "react";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { courseCodes } from "../ReadJSON";
import "../components.css";
import { AddNewCourseButton } from "./AddNewCourseButton";

export function CourseAutoComplete(): JSX.Element {
    const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>(
        []
    );
    const [activeSuggestionIndex, setActiveSuggestionIndex] =
        useState<number>(0);
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
    const [input, setInput] = useState<string>("");

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const userInput = e.target.value;

        // Filter our suggestions that don't contain the user's input
        const unLinked = courseCodes.filter((suggestion: string) =>
            suggestion.startsWith(userInput)
        );

        setInput(userInput);
        setFilteredSuggestions(unLinked);
        setActiveSuggestionIndex(0);
        setShowSuggestions(true);
    };

    const onClick = (suggestion: string) => {
        setFilteredSuggestions([]);
        setInput(suggestion);
        setActiveSuggestionIndex(0);
        setShowSuggestions(false);
    };

    const onKeyDown = (e: React.KeyboardEvent) => {
        // User pressed the enter key
        if (e.keyCode === 13) {
            setInput(filteredSuggestions[activeSuggestionIndex]);
            setActiveSuggestionIndex(0);
            setShowSuggestions(false);
        } else if (e.keyCode === 38) {
            // User pressed the up arrow
            if (activeSuggestionIndex === 0) {
                return;
            }

            setActiveSuggestionIndex(activeSuggestionIndex - 1);
        } else if (e.keyCode === 40) {
            // User pressed the down arrow
            if (activeSuggestionIndex - 1 === filteredSuggestions.length) {
                return;
            }

            setActiveSuggestionIndex(activeSuggestionIndex + 1);
        }
    };

    const SuggestionsListComponent = () => {
        return (
            <ul className="suggestions">
                {filteredSuggestions.map((suggestion, index) => {
                    let className;

                    // Flag the active suggestion with a class
                    if (index === activeSuggestionIndex) {
                        className = "suggestion-active";
                    }

                    return (
                        <li
                            className={className}
                            key={suggestion}
                            onClick={() => onClick(suggestion)}
                        >
                            {suggestion}
                        </li>
                    );
                })}
            </ul>
        );
    };

    return (
        <div className="DegreePlanList">
            {" "}
            <Form.Label>
                <br></br>Or, add a course from the catalog to the current course
                pool
            </Form.Label>
            <AddNewCourseButton input={input} />
            <Form.Control
                onChange={onChange}
                onKeyDown={onKeyDown}
                value={input}
                className="dropdown-border"
                placeholder="Enter a Course Code"
            />
            {showSuggestions && input && <SuggestionsListComponent />}
        </div>
    );
}
