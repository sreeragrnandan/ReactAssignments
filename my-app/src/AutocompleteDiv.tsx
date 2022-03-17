/* eslint-disable react-hooks/exhaustive-deps */
import { Chip, Grid, List, ListItem } from "@mui/material";
import React, { Fragment, useEffect, useRef, useState } from "react";
import CaretPositioning from "./EditCaretPositioning";
import setCaret from "./setCaret";

function measureText(
  pText: string | null,
  pFontSize: string,
  pStyle: CSSStyleDeclaration | null
) {
  console.log("pText ", pText);
  var lDiv = document.createElement("div");

  document.body.appendChild(lDiv);

  if (pStyle != null) {
    lDiv.style.border = "1px solid #999;";
    lDiv.style.padding = "0.5rem";
    lDiv.style.width = "300px";
  }
  lDiv.style.fontSize = "" + pFontSize + "px";
  lDiv.style.position = "absolute";
  lDiv.style.left = "-1000";
  lDiv.style.top = "-1000";

  lDiv.textContent = pText;

  var lResult = {
    width: lDiv.clientWidth,
    height: lDiv.clientHeight,
  };

  document.body.removeChild(lDiv);

  return lResult;
}

function AutocompleteDiv({ suggestions }: { suggestions: Array<string> }) {
  const [activeSuggestion, setActiveSuggestion] = useState<number>(0);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [conformedSuggestion, setConformedSuggestion] = useState<string>("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [userInput, setUserInput] = useState<string>("");
  const [contentWidth, setContentWidth] = useState("0px");
  const [caretPosition, setCaretPosition] = useState({ start: 0, end: 0 });
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [editable, setEditable] = useState<HTMLElement | null>(null);
  const [targetDiv, setTargetDiv] = useState<HTMLElement | null>(null);
  const inputAreaRef = useRef<HTMLDivElement>(null);
  const alllowedOperstions = ["+", "-", "(", ")", "*", "^", "%", "/"];
  let renderOutput: (string | JSX.Element)[];
  renderOutput = [];

  // let searchTerm: string;
  let savedCaretPosition: {
    start: number;
    end: number;
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLDivElement>) => {
    console.log("onChange suggestions", suggestions);
    if (
      inputAreaRef.current &&
      inputAreaRef.current.firstChild &&
      inputAreaRef.current.firstChild.nodeValue
    ) {
      console.log("onChangeHandler ", inputAreaRef.current.innerText);
      savedCaretPosition = CaretPositioning.saveSelection(e.currentTarget);
      if (!targetDiv) {
        setTargetDiv(e.currentTarget);
      }
      setCaretPosition(savedCaretPosition);
      // const userInp = inputAreaRef.current.innerText;
      const userInp = inputAreaRef.current.innerText;
      const searchArea = userInp.slice(0, savedCaretPosition.end);
      console.log("searchArea: ", searchArea);

      // For operators
      if (
        alllowedOperstions.includes(searchArea[searchArea.length - 1]) &&
        searchArea[searchArea.length - 1] !==
          conformedSuggestion[savedCaretPosition.end - 1]
      ) {
        let value: string;
        let val: string;
        savedCaretPosition = CaretPositioning.saveSelection(e.currentTarget);
        if (conformedSuggestion.length === 0) {
          val = "";
        } else {
          val = conformedSuggestion;
        }
        console.log(
          "conformedSuggestion.length",
          conformedSuggestion.length,
          "savedCaretPosition.end ",
          savedCaretPosition.end
        );
        if (savedCaretPosition.end === 0 || savedCaretPosition.end === 1) {
          value = searchArea[searchArea.length - 1] + conformedSuggestion;
        } else if (
          conformedSuggestion.length > savedCaretPosition.end &&
          conformedSuggestion.length > 0
        ) {
          value =
            conformedSuggestion.slice(0, savedCaretPosition.end - 1) +
            searchArea[searchArea.length - 1] +
            conformedSuggestion.slice(savedCaretPosition.end - 1);
        } else {
          value = val + searchArea[searchArea.length - 1];
        }
        setConformedSuggestion(value);
        setCaretPosition(savedCaretPosition);
        setContentWidth(
          (measureText(value, "16", null).width + 8).toString() + "px"
        );
        console.log(
          "conformedSuggestion",
          value,
          "savedCaretPosition.end ",
          savedCaretPosition.end
        );
      }
      var inputArray = searchArea.split(/\W+/g);
      console.log("inputArray ", inputArray);
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
      setShowSuggestions(true);
      setUserInput(inputAreaRef.current.innerText);
      console.log(
        "measureText ",
        measureText(
          inputAreaRef.current.innerText,
          "16",
          inputAreaRef.current.style
        ).width
      );
    }
  };

  useEffect(() => {
    setEditable(inputAreaRef.current);
    console.log("UE editable", editable, inputAreaRef.current);
    // document.getElementById("12357")?.focus();
  }, []);
  useEffect(() => {
    console.log(
      "inputAreaRef.current?.innerText userEffect",
      inputAreaRef.current?.innerText,
      "NumOfChildNode ",
      inputAreaRef.current?.childNodes.length
    );
  }, [inputAreaRef.current?.innerText]);

  const onClickButton = () => {
    console.log("conformedSuggestionButton: " + userInput);
  };

  const onClick = (e: { currentTarget: { innerText: string } }) => {
    var val;

    if (conformedSuggestion.length === 0) {
      val = "";
    } else {
      val = conformedSuggestion;
    }
    var value = val + e.currentTarget.innerText;
    setConformedSuggestion(val + e.currentTarget.innerText);
    setActiveSuggestion(0);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
    setUserInput(value);
    setContentWidth(
      (measureText(userInput, "16", null).width + 8).toString() + "px"
    );
  };
  const handleClick = () => {
    console.info("You clicked the Chip.");
  };
  const renderUserInput = (input: string) => {
    console.log("conformedSuggestion from renderInput ", conformedSuggestion);
    renderOutput = [];

    if (input.length !== 0 && conformedSuggestion.length !== 0) {
      // input = " " + input;
      let renderOutput: (string | JSX.Element | undefined)[];
      renderOutput = input.split(/(\W+)/g).map((value, index) => {
        if (
          conformedSuggestion.split(/(\W+)/g).includes(value) &&
          !alllowedOperstions.includes(value) &&
          value !== " "
        ) {
          return (
            <Chip
              id={"chip-id-" + index}
              key={"chip-key-" + index}
              label={value}
              variant="outlined"
            />
          );
        } else if (input.length !== 0 && conformedSuggestion.length === 0) {
          return value !== " " ? value : "";
        } else {
          return "";
        }
      });
      return renderOutput;
    } else {
      return "";
    }
  };

  const renderSuggestionsList = () => {
    let suggestionsListComponent;
    if (showSuggestions && userInput) {
      //   console.log("userInput", userInput);
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
            <em>No suggestions, you're on your own!</em>
          </div>
        );
      }
    }
    return suggestionsListComponent;
  };
  const focusEnd = () => {
    CaretPositioning.restoreSelection(
      document.getElementById("inputDiv"),
      savedCaretPosition
    );
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    console.log("enter press here! ", e.key);
    var value;
    e = e || window.event;

    savedCaretPosition = CaretPositioning.saveSelection(e.currentTarget);
    console.log(
      "keyEvent ",
      e.key,
      "savedCaretPosition.end from keypress: ",
      savedCaretPosition.end
    );
    console.log("onKeyHandler ", savedCaretPosition);
    console.log(
      "conformedSuggestion.length",
      conformedSuggestion.length,
      "conformedSuggestion ",
      conformedSuggestion,
      "savedCaretPosition.end ",
      savedCaretPosition.end
    );

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
        console.log("Value in block", value);
      } else {
        value = val + filteredSuggestions[activeSuggestion];
      }

      console.log(
        "Value ",
        value,
        "savedCaretPosition.end from enter: ",
        savedCaretPosition.end
      );
      savedCaretPosition.end =
        savedCaretPosition.end +
        (filteredSuggestions[activeSuggestion].length - searchTerm.length);
      if (savedCaretPosition.end > value.length) {
        savedCaretPosition.end = value.length;
      }
      console.log(
        "savedCaretPosition.end from enter: ",
        savedCaretPosition.end
      );
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
      <div>
        <Grid
          direction={"row"}
          id="inputDiv"
          suppressContentEditableWarning={true}
          placeholder="Please enter formula"
          contentEditable="true"
          onInput={onChangeHandler}
          onKeyPress={handleKeyPress}
          className="input"
          ref={inputAreaRef}
        >
          {renderUserInput(userInput)}
        </Grid>
      </div>
      {renderSuggestionsList()}
      <button type="button" onClick={onClickButton}>
        Submit
      </button>
      <button id="button" onClick={() => setCaret(inputAreaRef, caretPosition)}>
        setCaret
      </button>
      <button id="FoucsButton" onClick={() => focusEnd()}>
        focusEnd
      </button>
    </Fragment>
  );
}

export default AutocompleteDiv;
