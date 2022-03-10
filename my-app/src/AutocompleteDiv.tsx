/* eslint-disable react-hooks/exhaustive-deps */
import { List, ListItem } from "@mui/material";
import React, { Fragment, useEffect, useRef, useState } from "react";

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
  const [editable, setEditable] = useState<HTMLElement | null>(null);
  const inputAreaRef = useRef<HTMLDivElement>(null);

  const onChange = () => {
    console.log("onChange suggestions", suggestions);
    if (inputAreaRef.current) {
      const userInp = inputAreaRef.current.innerText;
      var inputArray = userInp.split(/\W+/g);
      console.log("inputArray ", inputArray);
      var searchTerm = inputArray[inputArray.length - 1];

      if (conformedSuggestion.length > userInp.length) {
        setConformedSuggestion(userInp);
        setContentWidth(
          measureText(userInp, "16", null).width.toString() + "px"
        );
      }

      // Filter our suggestions that don't contain the user's input
      const currSuggestions = suggestions.filter(
        (suggestion) =>
          suggestion.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
      );
      setActiveSuggestion(0);
      setFilteredSuggestions(currSuggestions);
      setShowSuggestions(true);
      setUserInput(inputAreaRef.current.innerText);
      // console.log("Caret at: ");
      // var fontSize = "12";
      // e.target.style.fontSize = fontSize;
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

  //   let editable = document.getElementById("inputDiv");
  // function inputEventListner() {
  //   let userInp = "";
  //   console.log("userInp ", userInp, " length: ", userInp.length);
  //   if (inputAreaRef.current != null) {
  //     userInp = inputAreaRef.current.innerText;
  //   }
  //   if (userInp === userInput) {
  //     return;
  //   }
  //   console.log("userInp ", userInp, " length: ", userInp.length);
  //   var inputArray = userInp.split(/\W+/g);
  //   var searchTerm = inputArray[inputArray.length - 1];

  //   if (conformedSuggestion.length > userInp.length) {
  //     setConformedSuggestion(userInp);
  //     setContentWidth(measureText(userInp, "16", null).width.toString() + "px");
  //   }
  //   //   inputAreaRef.current?.setPointerCapture=userInp.length

  //   // Filter our suggestions that don't contain the user's input
  //   const currSuggestions = suggestions.filter(
  //     (suggestion) =>
  //       suggestion.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
  //   );
  //   //   if (userInp !== userInput) {
  //   setActiveSuggestion(0);
  //   setFilteredSuggestions(currSuggestions);
  //   setShowSuggestions(true);
  //   setUserInput(userInp);
  //   //   }
  // }
  //   console.log("inputAreaRef.current ", inputAreaRef.current);
  if (inputAreaRef.current != null) {
    inputAreaRef.current.onkeydown = function (e) {
      e = e || window.event;
      // User pressed the enter key
      console.log(e.key);
      if (e.key === "Enter" && userInput.length > 0) {
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
      }
      // User pressed the up arrow
      else if (e.key === "ArrowUp") {
        if (activeSuggestion === 0) {
          return;
        }

        setActiveSuggestion(activeSuggestion - 1);
      }
      // User pressed the down arrow
      else if (e.key === "ArrowDown") {
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

  const renderUserInput = (input: string) => {
    var sel = window.getSelection();
    console.log("sel ", inputAreaRef.current);
    if (inputAreaRef.current != null && sel != null) {
      const range = document.createRange();

      sel?.removeAllRanges();
      range.selectNodeContents(inputAreaRef.current);
      range.collapse(false);

      sel?.addRange(range);
      inputAreaRef.current.focus();
    }
    return input; // === "undefined" ? "" : input;
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
  useEffect(() => {
    setEditable(inputAreaRef.current);
    console.log("UE editable", editable, inputAreaRef.current);
    // inputAreaRef.current?.addEventListener("input", inputEventListner);
    // return editable?.removeEventListener("input", inputEventListner);
  }, []);
  return (
    <Fragment>
      <div
        id="inputDiv"
        suppressContentEditableWarning={true}
        placeholder="Please enter formula"
        contentEditable="true"
        onInput={onChange}
        className="input"
        ref={inputAreaRef}
      >
        {/* {userInput} */}
        {/* {userInput.length === 0 ? setUserInput("") : ""} */}
        {renderUserInput(userInput)}
      </div>
      {renderSuggestionsList()}
      <button type="button" onClick={onClickButton}>
        Submit
      </button>
    </Fragment>
  );
}

export default AutocompleteDiv;
