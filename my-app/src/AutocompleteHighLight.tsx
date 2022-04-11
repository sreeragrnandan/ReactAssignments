import { Grid, List, ListItem } from "@mui/material";
// import HighlightWithinTextarea from "react-highlight-within-textarea";
// @ts-ignore
import { HighlightWithinTextarea } from "react-highlight-within-textarea";
import React, { Fragment, useRef, useState } from "react";
// import PropTypes from "prop-types";
import "./styles.css";
import CaretPositioning from "./EditCaretPositioning";
import { measureText } from "./measeureTextWidth";

function AutocompleteHeighLight({
  suggestions,
}: {
  suggestions: Array<string>;
}) {
  const [activeSuggestion, setActiveSuggestion] = useState<number>(0);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [conformedSuggestion, setConformedSuggestion] = useState<string>("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [userInput, setUserInput] = useState<string>("");
  const [contentWidth, setContentWidth] = useState("0px");
  const [caretPosition, setCaretPosition] = useState({ start: 0, end: 0 });
  const [searchTerm, setSearchTerm] = useState<string>("");
  // const [targetDiv, setTargetDiv] = useState<HTMLElement | null>(null);
  const inputAreaRef = useRef<HTMLDivElement>(null);
  const alllowedOperstions = ["+", "-", "(", ")", "*", "^", "%", "/"];
  var re = new RegExp(suggestions.join("|"), "gi");
  const highlight = [
    {
      highlight: re,
      className: "chip",
    },
  ];

  var savedCaretPosition: {
    start: number;
    end: number;
  };

  const onClickButton = () => {
    console.log("conformedSuggestionButton: " + userInput);
  };

  const onClick = (e: { currentTarget: { innerText: string } }) => {
    var val;
    var value;
    const savedCaretPosition = caretPosition;
    if (conformedSuggestion.length === 0) {
      val = "";
    } else {
      val = conformedSuggestion;
    }
    if (
      conformedSuggestion.length > savedCaretPosition.end &&
      conformedSuggestion.length > 0
    ) {
      value =
        conformedSuggestion.slice(
          0,
          savedCaretPosition.end - searchTerm.length
        ) +
        e.currentTarget.innerText +
        conformedSuggestion.slice(savedCaretPosition.end - searchTerm.length);
    } else {
      value = val + e.currentTarget.innerText;
    }
    savedCaretPosition.end =
      savedCaretPosition.end +
      (filteredSuggestions[activeSuggestion].length - searchTerm.length);
    if (savedCaretPosition.end > value.length) {
      savedCaretPosition.end = value.length;
    }
    // value = val + filteredSuggestions[activeSuggestion];
    setCaretPosition(savedCaretPosition);
    setConformedSuggestion(value);
    setActiveSuggestion(0);
    setShowSuggestions(false);
    setUserInput(value);
    setContentWidth(
      (measureText(value, "16", null).width + 8).toString() + "px"
    );
    setSearchTerm("");
  };

  const renderSuggestionsList = () => {
    let suggestionsListComponent;

    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <List className="suggestions" style={{ marginLeft: contentWidth }}>
            {filteredSuggestions.map((suggestion, index) => {
              let className;

              // Flag the active suggestion with a class
              if (index === activeSuggestion) {
                className = "suggestion-active";
              }

              return (
                <ListItem
                  className={className}
                  key={suggestion}
                  onClick={onClick}
                >
                  {suggestion}
                </ListItem>
              );
            })}
          </List>
        );
      } else {
        suggestionsListComponent = (
          <div className="no-suggestions">
            <em>labal not found, please check your input</em>
          </div>
        );
      }
    }
    return suggestionsListComponent;
  };

  const onChangeHandler = (userText: string) => {
    if (inputAreaRef.current) {
      savedCaretPosition = CaretPositioning.saveSelection(inputAreaRef.current);
      setCaretPosition(savedCaretPosition);

      const userInp = userText;

      // const userInp = inputAreaRef.current.innerText;
      const searchArea = userInp.slice(0, savedCaretPosition.end + 1);

      // For operators
      if (
        alllowedOperstions.includes(searchArea[searchArea.length - 1]) &&
        searchArea[searchArea.length - 1] !==
          conformedSuggestion[savedCaretPosition.end - 1]
      ) {
        setShowSuggestions(false);
        savedCaretPosition = CaretPositioning.saveSelection(
          inputAreaRef.current
        );
        setConformedSuggestion(userText);
        setCaretPosition(savedCaretPosition);
        setContentWidth(
          (measureText(userText, "16", null).width + 8).toString() + "px"
        );
        setUserInput(userText);
      } else {
        var inputArray = searchArea.split(/(\W+)/g);
        var srhTerm: string;
        setSearchTerm(inputArray[inputArray.length - 1]);
        srhTerm = inputArray[inputArray.length - 1];

        // If user delets characters from input
        if (conformedSuggestion.length > userInp.length) {
          if (
            !suggestions.includes(srhTerm) &&
            !alllowedOperstions.includes(searchTerm)
          ) {
            setConformedSuggestion(userInp.replace(srhTerm, ""));
          } else {
            setConformedSuggestion(userInp);
          }
          setContentWidth(
            measureText(userInp, "16", null).width.toString() + "px"
          );
        }

        //If cursour moved to the left
        if (conformedSuggestion.length > searchArea.length) {
          setContentWidth(
            measureText(searchArea, "16", null).width.toString() + "px"
          );
        }
        // Filter our suggestions that don't contain the user's input
        const currSuggestions = suggestions.filter(
          (suggestion) =>
            suggestion.toLowerCase().indexOf(srhTerm.toLowerCase()) > -1
        );
        setActiveSuggestion(0);
        setFilteredSuggestions(currSuggestions);
        if (srhTerm.length >= 3) {
          setShowSuggestions(true);
        } else {
          setShowSuggestions(false);
        }
        setUserInput(userText);
      }
    }
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    var value;
    e = e || window.event;

    savedCaretPosition = CaretPositioning.saveSelection(e.currentTarget);

    // User pressed the enter key
    if (e.key === "Escape") {
      if (showSuggestions) {
        setShowSuggestions(false);
      } else if (!showSuggestions) {
        inputAreaRef.current?.blur();
      }
    }
    if (e.key === "Enter" && userInput.length > 0) {
      e.preventDefault();
      var val;
      if (conformedSuggestion.length === 0) {
        val = "";
      } else {
        val = conformedSuggestion;
      }
      if (
        conformedSuggestion.length > savedCaretPosition.end &&
        conformedSuggestion.length > 0
      ) {
        value =
          conformedSuggestion.slice(
            0,
            savedCaretPosition.end - searchTerm.length
          ) +
          filteredSuggestions[activeSuggestion] +
          conformedSuggestion.slice(savedCaretPosition.end - searchTerm.length);
      } else {
        value = val + filteredSuggestions[activeSuggestion];
      }
      savedCaretPosition.end =
        savedCaretPosition.end +
        (filteredSuggestions[activeSuggestion].length - searchTerm.length);
      if (savedCaretPosition.end > value.length) {
        savedCaretPosition.end = value.length;
      }
      // value = val + filteredSuggestions[activeSuggestion];
      setCaretPosition(savedCaretPosition);
      setConformedSuggestion(value);
      setActiveSuggestion(0);
      setShowSuggestions(false);
      setUserInput(value);
      setContentWidth(
        (measureText(value, "16", null).width + 8).toString() + "px"
      );
      setSearchTerm("");
    }
    // User pressed the up arrow
    else if (e.key === "ArrowUp") {
      if (showSuggestions) {
        e.preventDefault();
      }
      if (activeSuggestion === 0) {
        setShowSuggestions(false);
        return;
      }
      setActiveSuggestion(activeSuggestion - 1);
    }
    // User pressed the down arrow
    else if (e.key === "ArrowDown") {
      if (showSuggestions) {
        e.preventDefault();
      }
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }
      setActiveSuggestion(activeSuggestion + 1);
    }
    setCaretPosition(savedCaretPosition);
  };

  return (
    <Fragment>
      <Grid
        tabIndex={0}
        ref={inputAreaRef}
        id="inputArea"
        onKeyDown={handleKeyPress}
        className="input"
      >
        <HighlightWithinTextarea
          value={userInput}
          type="text"
          placeholder={""}
          highlight={highlight}
          onChange={onChangeHandler}
          contentEditable={"true"}
          autofocus
          className={"chipDisplay"}
        />
      </Grid>
      {renderSuggestionsList()}
      <button type="button" onClick={onClickButton}>
        Submit
      </button>
    </Fragment>
  );
}

export default AutocompleteHeighLight;
