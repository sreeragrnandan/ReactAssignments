import { render } from "react-dom";
import Autocomplete from "./Autocomplete";

import AutocompleteDiv from "./AutocompleteDiv";

require("./styles.css");

function App() {
  return (
    <div>
      <h1>Auto suggestion Div</h1>
      <AutocompleteDiv
        suggestions={[
          "Alligator",
          "Bask",
          "Crocodilian",
          "Death Roll",
          "Eggs",
          "Jaws",
          "Reptile",
          "Solitary",
          "Tail",
          "Wetlands",
        ]}
      />

      <h1>Auto suggestion</h1>
      <Autocomplete
        suggestions={[
          "Alligator",
          "Bask",
          "Crocodilian",
          "Death Roll",
          "Eggs",
          "Jaws",
          "Reptile",
          "Solitary",
          "Tail",
          "Wetlands",
        ]}
      />
    </div>
  );
}

const container = document.createElement("div");
document.body.appendChild(container);
render(<App />, container);
