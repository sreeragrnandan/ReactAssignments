import { Grid, List, ListItem } from "@mui/material";
// import HighlightWithinTextarea from "react-highlight-within-textarea";
// @ts-ignore
import { HighlightWithinTextarea } from "react-highlight-within-textarea";
import React, { Fragment, useRef, useState } from "react";
// import PropTypes from "prop-types";
import "./styles.css";
import CaretPositioning from "./EditCaretPositioning";
import { measureText } from "./measeureTextWidth";
import { Suggestion } from "./types";

function SuggestWithObject({ suggestions }: { suggestions: Suggestion }) {
  const [activeSuggestion, setActiveSuggestion] = useState<number>(0);
  const [filteredSuggestionsList, setFilteredSuggestionsList] = useState<
    string[][]
  >([]);
  const [conformedSuggestionList, setConformedSuggestionList] = useState<
    string[][]
  >([]);
  const [conformedSuggestion, setConformedSuggestion] = useState<string>("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [userInput, setUserInput] = useState<string>("");
  const [contentWidth, setContentWidth] = useState("0px");
  const [caretPosition, setCaretPosition] = useState({ start: 0, end: 0 });
  const [searchTerm, setSearchTerm] = useState<string>("");
  // const [targetDiv, setTargetDiv] = useState<HTMLElement | null>(null);
  const inputAreaRef = useRef<HTMLDivElement>(null);
  const alllowedOperstions = ["+", "-", "(", ")", "*", "^", "%", "/"];
  const reStr = Object.values(suggestions)
    .map(function (suggestion) {
      return suggestion;
    })
    .join("|");
  var re = new RegExp(reStr, "gi");
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
    console.log("conformedSuggestionButton: " + conformedSuggestion);
    console.log("conformedSuggestionList: ", conformedSuggestionList);
    console.log("userInput: " + userInput);
  };

  const onClick = (e: React.MouseEvent<HTMLElement>) => {
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
      (filteredSuggestionsList[activeSuggestion][1].length - searchTerm.length);
    if (savedCaretPosition.end > value.length) {
      savedCaretPosition.end = value.length;
    }
    // value = val + filteredSuggestions[activeSuggestion];
    const target = e.target as HTMLLIElement;
    console.log(target.id, "target ", target.value);
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
      if (filteredSuggestionsList.length) {
        suggestionsListComponent = (
          <List className="suggestions" style={{ marginLeft: contentWidth }}>
            {filteredSuggestionsList.map((suggestion, index) => {
              let className;

              // Flag the active suggestion with a class
              if (index === activeSuggestion) {
                className = "suggestion-active";
              }

              return (
                <ListItem
                  className={className}
                  key={suggestion[0]}
                  id={suggestion[0]}
                  onClick={onClick}
                >
                  {suggestion[1]}
                </ListItem>
              );
            })}
          </List>
        );
      } else {
        suggestionsListComponent = (
          <div className="no-suggestions">
            <em>No suggestions, you're on your own!</em>
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
        const inputArray = searchArea.split(/(?!\.)(\W+)/g);
        const cList = [
          ...conformedSuggestionList.slice(0, inputArray.length),
          [
            searchArea[searchArea.length - 1],
            searchArea[searchArea.length - 1],
          ],
          ...conformedSuggestionList.slice(
            inputArray.length,
            conformedSuggestionList.length
          ),
        ];
        if (cList.length > userInp.length) {
          // const present = Object.values(suggestions).includes(srhTerm);
          cList.splice(inputArray.length, 1);
        }
        setConformedSuggestionList(cList);
        setUserInput(userText);
      } else {
        var inputArray = searchArea.split(/(?!\.)(\W+)/g);
        var srhTerm: string;
        setSearchTerm(inputArray[inputArray.length - 1]);
        srhTerm = inputArray[inputArray.length - 1];

        // If user deletes characters from input
        if (conformedSuggestion.length > userInp.length) {
          const present = Object.values(suggestions).includes(srhTerm);
          setConformedSuggestionList((prev) =>
            prev.splice(inputArray.length - 1, 1)
          );
          if (!present && !alllowedOperstions.includes(srhTerm)) {
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

        var currSuggestions: [string, string][];
        currSuggestions = Object.entries(suggestions).filter((value) => {
          return value[1].toLowerCase().indexOf(srhTerm.toLowerCase()) > -1;
        });

        setActiveSuggestion(0);
        setFilteredSuggestionsList(currSuggestions);
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
          filteredSuggestionsList[activeSuggestion][1] +
          conformedSuggestion.slice(savedCaretPosition.end - searchTerm.length);
      } else {
        value = val + filteredSuggestionsList[activeSuggestion][1];
      }
      savedCaretPosition.end =
        savedCaretPosition.end +
        (filteredSuggestionsList[activeSuggestion][1].length -
          searchTerm.length);
      if (savedCaretPosition.end > value.length) {
        savedCaretPosition.end = value.length;
      }
      console.log("conformed suggestion ", value);
      const inpArray = userInput.slice(0, savedCaretPosition.end + 1);
      setConformedSuggestionList((prevVal) => [
        ...prevVal.slice(0, inpArray.length),
        filteredSuggestionsList[activeSuggestion],
        ...prevVal.slice(inpArray.length, prevVal.length),
      ]);
      console.log("conformed suggestion code", conformedSuggestionList);
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
      if (activeSuggestion - 1 === filteredSuggestionsList.length) {
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
        // contentEditable={"true"}
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

export default SuggestWithObject;
