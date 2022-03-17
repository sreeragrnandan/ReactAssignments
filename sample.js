// const keydownEventListner = () => {
//   if (inputAreaRef.current != null) {
//     inputAreaRef.current.onkeydown = function (e) {
//       e = e || window.event;
//       // User pressed the enter key
//       console.log(e.key);
//       if (e.key === "Enter" && userInput.length > 0) {
//         var val;
//         if (conformedSuggestion.length === 0) {
//           val = "";
//         } else {
//           val = conformedSuggestion + " ";
//         }
//         var value = val + filteredSuggestions[activeSuggestion];
//         setConformedSuggestion(val + filteredSuggestions[activeSuggestion]);
//         setActiveSuggestion(0);
//         setShowSuggestions(false);
//         setUserInput(value);
//         setContentWidth(
//           (measureText(value, "16", null).width + 8).toString() + "px"
//         );
//       }
//       // User pressed the up arrow
//       else if (e.key === "ArrowUp") {
//         if (activeSuggestion === 0) {
//           return;
//         }

//         setActiveSuggestion(activeSuggestion - 1);
//       }
//       // User pressed the down arrow
//       else if (e.key === "ArrowDown") {
//         if (activeSuggestion - 1 === filteredSuggestions.length) {
//           return;
//         }
//         setActiveSuggestion(activeSuggestion + 1);
//       }
//     };
//   }
// };

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
