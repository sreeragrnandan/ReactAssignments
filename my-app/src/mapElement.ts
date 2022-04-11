import { Suggestion } from "./types";

export const constructExp = (
  userInput: string,
  suggestions: Suggestion,
  allowdedOperation: Suggestion
) => {
  const userInputArray = userInput.split(/(?!\.)(\W+)/g);
  console.log("userInput ", userInputArray);
  let expression = "";
  for (let i = 0; i < userInputArray.length; i++) {
    if (userInputArray[i] === " ") {
      continue;
    } else if (allowdedOperation[userInputArray[i]] !== undefined) {
      expression = expression + allowdedOperation[userInputArray[i]];
    } else if (suggestions[userInputArray[i]] !== undefined) {
      expression = expression + suggestions[userInputArray[i]];
    } else {
      for (let j = 0; j < userInputArray[i].length; j++) {
        if (userInputArray[i][j] === " ") {
          continue;
        } else if (allowdedOperation[userInputArray[i][j]] !== undefined) {
          expression = expression + allowdedOperation[userInputArray[i][j]];
        } else {
          console.log("error in convertion", userInputArray[i], j);
          return "";
        }
      }
    }
  }
  return expression;
};
