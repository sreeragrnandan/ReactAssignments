import { Suggestion } from "./types";

export const constructExp = (
  userInput: string,
  suggestions: Suggestion,
  allowdedOperation: Suggestion,
  specialOperation: Suggestion
) => {
  const userInputArray = userInput.split(/(?!\.)(\W+)/g);
  let expression = "";
  for (let i = 0; i < userInputArray.length; i++) {
    if (allowdedOperation[userInputArray[i]] !== undefined) {
      expression = expression + allowdedOperation[userInputArray[i]];
    } else if (specialOperation[userInputArray[i]] !== undefined) {
      expression = expression + specialOperation[userInputArray[i]];
    } else if (suggestions[userInputArray[i]] !== undefined) {
      expression = expression + specialOperation[userInputArray[i]];
    } else {
      console.log("error in convertion");
      return "";
    }
  }
  return expression;
};
