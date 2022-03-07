import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

class Autocomplete extends Component {
  static propTypes = {
    suggestions: PropTypes.instanceOf(Array),
  };

  static defaultProps = {
    suggestions: [],
  };

  constructor(props) {
    super(props);

    this.state = {
      // The active selection's index
      activeSuggestion: 0,
      // The suggestions that match the user's input
      filteredSuggestions: [],
      conformedSuggestion: "",
      // Whether or not the suggestion list is shown
      showSuggestions: false,
      // What the user has entered
      userInput: "",
      currentInput: "",
    };
  }
  onClickButton = (e) => {
    console.log("conformedSuggestionButton: " + this.state.userInput);
  };
  onChange = (e) => {
    const { suggestions } = this.props;
    const userInput = e.currentTarget.value;
    var inputArray = userInput.split(" ");
    var searchTerm = inputArray[inputArray.length - 1];
    if (this.state.conformedSuggestion.length > userInput.length) {
      this.setState({ conformedSuggestion: userInput });
    }

    // Filter our suggestions that don't contain the user's input
    const filteredSuggestions = suggestions.filter(
      (suggestion) =>
        suggestion.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
    );

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value,
    });
  };

  onClick = (e) => {
    var val;

    if (this.state.conformedSuggestion.length === 0) {
      val = "";
    } else {
      val = this.state.conformedSuggestion + " ";
    }
    var value = val + e.currentTarget.innerText;
    this.setState({
      conformedSuggestion: val + e.currentTarget.innerText,
    });

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: value,
    });

    console.log("conformedSuggestion: " + this.state.conformedSuggestion);
    console.log("user input: " + this.state.userInput);
  };

  onKeyDown = (e) => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    // User pressed the enter key
    if (e.keyCode === 13) {
      var val;
      if (this.state.conformedSuggestion.length === 0) {
        val = "";
      } else {
        val = this.state.conformedSuggestion + " ";
      }
      var value = val + filteredSuggestions[activeSuggestion];
      this.setState({
        conformedSuggestion: val + filteredSuggestions[activeSuggestion],
      });
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: value,
      });
      console.log("conformedSuggestion: " + this.state.conformedSuggestion);
    }
    // User pressed the up arrow
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    // User pressed the down arrow
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      onClickButton,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput,
      },
    } = this;

    let suggestionsListComponent;

    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul className="suggestions">
            {filteredSuggestions.map((suggestion, index) => {
              let className;

              // Flag the active suggestion with a class
              if (index === activeSuggestion) {
                className = "suggestion-active";
              }

              return (
                <li className={className} key={suggestion} onClick={onClick}>
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      } else {
        suggestionsListComponent = (
          <div className="no-suggestions">
            <em>No suggestions, you're on your own!</em>
          </div>
        );
      }
    }

    return (
      <Fragment>
        <input
          type="text"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={userInput}
        />
        {suggestionsListComponent}
        <button type="button" onClick={onClickButton}>
          Submit
        </button>
      </Fragment>
    );
  }
}

export default Autocomplete;
