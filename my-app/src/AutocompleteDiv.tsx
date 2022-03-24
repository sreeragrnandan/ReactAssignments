/* eslint-disable react-hooks/exhaustive-deps */
import { Chip, Grid, List, ListItem } from "@mui/material";
import { color } from "@mui/system";
import React, { Fragment, useEffect, useRef, useState } from "react";
import CaretPositioning from "./EditCaretPositioning";
import setCaret from "./setCaret";

function measureText(
  pText: string | null,
  pFontSize: string,
  pStyle: CSSStyleDeclaration | null
) {
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
  // const [targetDiv, setTargetDiv] = useState<HTMLElement | null>(null);
  const inputAreaRef = useRef<HTMLDivElement>(null);
  const alllowedOperstions = ["+", "-", "(", ")", "*", "^", "%", "/"];
  let renderOutput: (string | JSX.Element | HTMLSpanElement | undefined)[];

  // let searchTerm: string;
  let savedCaretPosition: {
    start: number;
    end: number;
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLDivElement>) => {
    if (inputAreaRef.current && inputAreaRef.current.firstChild) {
      savedCaretPosition = CaretPositioning.saveSelection(e.currentTarget);

      setCaretPosition(savedCaretPosition);

      const userInp = inputAreaRef.current.innerText;

      // const userInp = inputAreaRef.current.innerText;
      const searchArea = userInp.slice(0, savedCaretPosition.end);
      console.log(
        "onChangeHandler ",
        inputAreaRef.current.innerText,
        "searchArea: ",
        searchArea
      );

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
    }
  };

  useEffect(() => {
    setEditable(inputAreaRef.current);
    console.log("UE editable", editable, inputAreaRef.current);
  }, []);
  useEffect(() => {
    console.log(
      "inputAreaRef.current?.innerText userEffect",
      inputAreaRef.current?.innerText,
      "NumOfChildNode ",
      inputAreaRef.current?.childNodes.length
    );
  }, [inputAreaRef.current?.innerText]);

  let ueCaretPosition = {
    start: 0,
    end: 0,
  };
  useEffect(() => {
    const handleUserKeyPress = (e: any) => {
      console.log("enter press here! ", e.key, "e.target ", e.target);
      var value;
      e = e || window.event;

      ueCaretPosition = CaretPositioning.saveSelection(e.currentTarget);
      console.log(
        "keyEvent ",
        e.key,
        "ueCaretPosition.end from keypress: ",
        ueCaretPosition.end
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
          conformedSuggestion.length > ueCaretPosition.end &&
          conformedSuggestion.length > 0
        ) {
          value =
            conformedSuggestion.slice(
              0,
              ueCaretPosition.end - searchTerm.length
            ) +
            filteredSuggestions[activeSuggestion] +
            conformedSuggestion.slice(ueCaretPosition.end - searchTerm.length);
        } else {
          value = val + filteredSuggestions[activeSuggestion];
        }

        console.log(
          "Value ",
          value,
          "ueCaretPosition.end from enter: ",
          ueCaretPosition.end
        );
        ueCaretPosition.end =
          ueCaretPosition.end +
          (filteredSuggestions[activeSuggestion].length - searchTerm.length);
        if (ueCaretPosition.end > value.length) {
          ueCaretPosition.end = value.length;
        }

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
        console.log("from ArrowDown");
        if (activeSuggestion - 1 === filteredSuggestions.length) {
          return;
        }
        setActiveSuggestion(activeSuggestion + 1);
      }
      setCaretPosition(ueCaretPosition);
    };
    document?.addEventListener("keydown", handleUserKeyPress);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSuggestion]);

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
  // const handleClick = () => {
  //   console.info("You clicked the Chip.");
  // };

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
    var el = inputAreaRef.current;
    el?.focus();
    var range = document.createRange();
    var sel = window.getSelection();
    if (el && sel) {
      console.log(
        "focus caretPosition.end",
        caretPosition,
        "el.childNodes[0]",
        el.childNodes[0]
      );
      range.setEnd(el.childNodes[1], caretPosition.end);
      range.collapse(true);

      sel.removeAllRanges();
      sel.addRange(range);
    }
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    console.log(
      " from handle keyPress enter press here! ",
      e.key,
      "e.target ",
      e.target
    );
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
      console.log("userInput from handleKeyPress ", value);
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
      console.log("from ArrowDown 123");
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }
      setActiveSuggestion(activeSuggestion + 1);
    }
    setCaretPosition(savedCaretPosition);
  };

  const renderUserInput = (input: string) => {
    renderOutput = [];

    console.log(
      "conformedSuggestionFromRenderInput ",
      conformedSuggestion,
      " userInputLog",
      input
    );
    if (input.length !== 0 && conformedSuggestion.length !== 0) {
      renderOutput = input.split(/(\W+)/g).map((value, index) => {
        if (
          conformedSuggestion.split(/(\W+)/g).includes(value) &&
          !alllowedOperstions.includes(value) &&
          value !== " " &&
          value !== ""
        ) {
          return (
            // <Chip
            //   tabIndex={index}
            //   id={"chip-id-" + index}
            //   key={"chip-key-" + index}
            //   label={value}
            //   variant="outlined"
            //   onKeyDown={handleKeyPress}
            //   onKeyPress={handleKeyPress}
            // />
            <Grid
              item
              sx={{
                color: "red",
                border: "1px solid #999",
                borderRadius: "10px",
                marginRight: "5px",
                padding: "3px",
              }}
            >
              {value}
            </Grid>
          );
        } else if (alllowedOperstions.includes(value)) {
          return (
            // <Chip
            //   tabIndex={index}
            //   id={"chip-id-" + index}
            //   key={"chip-key-" + index}
            //   label={value}
            //   onKeyDown={handleKeyPress}
            //   onKeyPress={handleKeyPress}
            //   sx={{
            //     border: "0px solid transparent",
            //     paddingLeft: "0px",
            //     paddingRight: "0px",
            //   }}
            //   variant="outlined"
            // />
            <Grid
              item
              sx={{
                color: "red",
                marginRight: "5px",
                padding: "3px",
              }}
            >
              {value}
            </Grid>
          );
        } else {
          // eslint-disable-next-line array-callback-return
          return;
        }
      });
      renderOutput.push(
        // <Chip
        //   id={"chip-id-lastIndex"}
        //   key={"chip-key-lastIndex"}
        //   onKeyDown={handleKeyPress}
        //   onKeyPress={handleKeyPress}
        //   tabIndex={0}
        //   label={" "}
        //   sx={{
        //     border: "0px solid transparent",
        //     paddingLeft: "0px",
        //     paddingRight: "0px",
        //     "& .css-6od3lo-MuiChip-label": {
        //       paddingLeft: "0px",
        //       paddingRight: "0px",
        //     },
        //   }}
        //   variant="outlined"
        // />
        <Grid
          item
          id={"end-div-" + userInput.length}
          sx={{
            color: "red",
            padding: "3px",
          }}
        >
          &nbsp;
        </Grid>
      );
      return renderOutput;
    } else {
      renderOutput = [];
      renderOutput.push(
        // <Chip
        //   id={"chip-id-empty"}
        //   key={"chip-key-empty"}
        //   tabIndex={0}
        //   onKeyDown={handleKeyPress}
        //   onKeyPress={handleKeyPress}
        //   label={" "}
        //   sx={{ border: "0px solid transparent" }}
        //   variant="outlined"
        // />
        <Grid item sx={{ color: "red" }}>
          &nbsp;
        </Grid>
      );
      return renderOutput;
    }
    // return input;
  };

  return (
    <Fragment>
      <Grid
        container
        direction={"row"}
        id="inputDiv"
        suppressContentEditableWarning={true}
        placeholder="Please enter formula"
        // data-interception="off"
        contentEditable={"true"}
        onInput={onChangeHandler}
        onKeyPress={handleKeyPress}
        className="input"
        ref={inputAreaRef}
      >
        {renderUserInput(userInput)}
      </Grid>

      {renderSuggestionsList()}
      <button type="button" onClick={onClickButton}>
        Submit
      </button>
      <button id="button" onClick={() => setCaret(inputAreaRef, caretPosition)}>
        GetCaret
      </button>
      <button id="FoucsButton" onClick={() => focusEnd()}>
        setCaret
      </button>
    </Fragment>
  );
}

export default AutocompleteDiv;
