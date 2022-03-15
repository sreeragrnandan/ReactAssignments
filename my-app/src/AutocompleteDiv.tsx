/* eslint-disable react-hooks/exhaustive-deps */
import { List, ListItem } from "@mui/material";
import React, { Fragment, useEffect, useRef, useState } from "react";
import CaretPositioning from "./EditCaretPositioning";

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
  const inputAreaRef = useRef<HTMLDivElement>(null);
  // let searchTerm: string;
  let savedCaretPosition: {
    start: number;
    end: number;
  };

  const onChangeHandler = (event: React.ChangeEvent<HTMLDivElement>) => {
    console.log("onChange suggestions", suggestions);
    if (inputAreaRef.current) {
      console.log("onChangeHandler", event);
      savedCaretPosition = CaretPositioning.saveSelection(event.currentTarget);
      setCaretPosition(savedCaretPosition);
      const userInp = inputAreaRef.current.innerText;
      const searchArea = userInp.slice(0, savedCaretPosition.end);
      var inputArray = searchArea.split(/\W+/g);
      console.log("inputArray ", inputArray);
      var srhTerm: string;
      setSearchTerm(inputArray[inputArray.length - 1]);
      srhTerm = inputArray[inputArray.length - 1];
      if (conformedSuggestion.length > userInp.length) {
        if (!suggestions.includes(srhTerm)) {
          setConformedSuggestion(userInp.replace(" " + srhTerm, ""));
        } else {
          setConformedSuggestion(userInp);
        }
        setContentWidth(
          measureText(userInp, "16", null).width.toString() + "px"
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
  }, []);
  useEffect(() => {
    setCaret();
    inputAreaRef.current?.focus();
  }, [inputAreaRef.current?.innerText]);

  if (inputAreaRef.current != null) {
    inputAreaRef.current.onkeydown = function (e) {
      var value;
      e = e || window.event;

      console.log("keyEvent ", e.key);
      savedCaretPosition = CaretPositioning.saveSelection(e.currentTarget);
      console.log("onKeyHandler ", savedCaretPosition);
      console.log(
        "conformedSuggestion.length",
        conformedSuggestion.length,
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
        var val;
        if (conformedSuggestion.length === 0) {
          val = "";
        } else {
          val = conformedSuggestion + " ";
        }
        console.log(
          "conformedSuggestion.length",
          conformedSuggestion.length,
          "savedCaretPosition.end ",
          savedCaretPosition.end
        );
        if (
          conformedSuggestion.length > savedCaretPosition.end &&
          conformedSuggestion.length > 0
        ) {
          console.log("Value in block", value);
          value =
            conformedSuggestion.slice(
              0,
              savedCaretPosition.end - searchTerm.length
            ) +
            " " +
            filteredSuggestions[activeSuggestion] +
            conformedSuggestion.slice(
              savedCaretPosition.end - searchTerm.length
            );
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
          (filteredSuggestions[activeSuggestion].length - searchTerm.length) +
          1;
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
    };
  }

  const onClickButton = () => {
    console.log("conformedSuggestionButton: " + userInput);
  };

  const onClick = (e: { currentTarget: { innerText: string } }) => {
    var val;

    if (conformedSuggestion.length === 0) {
      val = "";
    } else {
      val = conformedSuggestion + " ";
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
  const setCaret = () => {
    var el = inputAreaRef.current;
    var range = document.createRange();
    var sel = window.getSelection();
    if (el !== null && sel !== null && el.innerText.length > 0) {
      range.setStart(el.childNodes[0], caretPosition.end);
      range.collapse(true);
      console.log("setCaret ", caretPosition.end);
      sel.removeAllRanges();
      sel.addRange(range);
      el.focus();
    }
  };
  const renderUserInput = (input: string) => {
    // inputAreaRef.current?.focus();
    // setCaret();
    return input === "undefined" ? "" : input;
  };

  // var sel = window.getSelection();
  // console.log("sel ", inputAreaRef.current);
  // if (inputAreaRef.current != null && sel != null && userInput.length > 0) {
  //   // var el = document.getElementById("editable")
  //   var range = document.createRange();

  //   range.setStart(inputAreaRef.current.childNodes[0], caretPosition.end);
  //   range.collapse(true);

  //   sel.removeAllRanges();
  //   sel.addRange(range);
  // }

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

  return (
    <Fragment>
      <div
        id="inputDiv"
        suppressContentEditableWarning={true}
        placeholder="Please enter formula"
        contentEditable="true"
        onInput={onChangeHandler}
        className="input"
        ref={inputAreaRef}
      >
        {/* {userInput} */}
        {/* {userInput.length === 0 ? setUserInput("") : ""} */}
        {renderUserInput(userInput)}
      </div>
      {/* {setCaret()} */}
      {renderSuggestionsList()}
      <button type="button" onClick={onClickButton}>
        Submit
      </button>
      <button id="button" onClick={setCaret}>
        focus
      </button>
      {/* {setCaret()} */}
    </Fragment>
  );
}

export default AutocompleteDiv;
