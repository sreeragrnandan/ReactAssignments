import { List, ListItem, OutlinedInput } from "@mui/material";
import React, { Fragment, useState } from "react";
// import PropTypes from "prop-types";
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

function Autocomplete({ suggestions }: { suggestions: Array<string> }) {
  const [activeSuggestion, setActiveSuggestion] = useState<number>(0);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [conformedSuggestion, setConformedSuggestion] = useState<string>("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [userInput, setUserInput] = useState<string>("");
  const [contentWidth, setContentWidth] = useState("0px");

  const onClickButton = () => {
    console.log("conformedSuggestionButton: " + userInput);
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(suggestions);
    const userInp = e.currentTarget.value;
    var inputArray = userInp.split(/\W+/g);
    console.log("inputArray ", inputArray);
    var searchTerm = inputArray[inputArray.length - 1];

    if (conformedSuggestion.length > userInp.length) {
      setConformedSuggestion(userInp);
      setContentWidth(measureText(userInp, "16", null).width.toString() + "px");
    }

    // Filter our suggestions that don't contain the user's input
    const currSuggestions = suggestions.filter(
      (suggestion) =>
        suggestion.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
    );
    setActiveSuggestion(0);
    setFilteredSuggestions(currSuggestions);
    setShowSuggestions(true);
    setUserInput(e.currentTarget.value);
    console.log("Caret at: ", e.target.selectionEnd);
    var fontSize = "12";
    e.target.style.fontSize = fontSize;
    console.log(
      "measureText ",
      measureText(e.target.value, "16", e.target.style).width
    );
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
    console.log("conformedSuggestion: " + conformedSuggestion);
    console.log("user input: " + userInput);
  };

  const onKeyDown = (e: { keyCode: number }) => {
    // const { activeSuggestion, filteredSuggestions } = this.state;

    // User pressed the enter key
    if (e.keyCode === 13) {
      var val;
      if (conformedSuggestion.length === 0) {
        val = "";
      } else {
        val = conformedSuggestion + " ";
      }
      var value = val + filteredSuggestions[activeSuggestion];
      setConformedSuggestion(val + filteredSuggestions[activeSuggestion]);
      setActiveSuggestion(0);
      setShowSuggestions(false);
      setUserInput(value);
      setContentWidth(
        (measureText(value, "16", null).width + 8).toString() + "px"
      );
      console.log("conformedSuggestion: " + conformedSuggestion);
    }
    // User pressed the up arrow
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      setActiveSuggestion(activeSuggestion - 1);
    }
    // User pressed the down arrow
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }
      setActiveSuggestion(activeSuggestion + 1);
    }
  };

  const renderSuggestionsList = () => {
    let suggestionsListComponent;

    if (showSuggestions && userInput) {
      console.log("userInput", userInput);
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
      <OutlinedInput
        type="text"
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={userInput}
        id="inputArea"
        placeholder="Please enter formula"
        contentEditable="true"
        className="input"
      />
      {renderSuggestionsList()}
      <button type="button" onClick={onClickButton}>
        Submit
      </button>
    </Fragment>
  );
}

export default Autocomplete;
