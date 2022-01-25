// Import the React and ReactDom libraries
import React from "react";
import ReactDom from "react-dom";

function getButtonText() {
  return "Click on me!";
}
// Create a react component
const App = () => {
  const buttonText = "Click Me!";
  return (
    <div>
      <label className="label" htmlFor="name">
        Enter name
      </label>
      <input id="name" type="text" />
      <button style={{ backgroundColor: "blue", color: "white" }}>
        {getButtonText()}
      </button>
    </div>
  );
};
// Take the react component and show it on the screen
ReactDom.render(<App />, document.querySelector("#root"));
