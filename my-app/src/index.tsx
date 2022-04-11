import { render } from "react-dom";

import SuggestWithObject from "./suggestionWithObject";
// import SuggestWithObject from "./suggestionWithObject";

require("./styles.css");

function App() {
  return (
    <div>
      <h1>Object HighLight</h1>
      <SuggestWithObject
        suggestions={{
          "bs.123": "bs.TotalCurrentRatio",
          "pnl.321": "pnl.NetAsset",
          "bs.231": "bs.IntangibleAssests",
          "pnl.231": "pnl.Inventory",
          "bs.789": "bs.TotalCurrentLiability",
          "pnl.456": "pnl.NetPayment",
          "bs.147": "bs.InvoiceDate",
          "pnl.963": "pnl.Solitary",
        }}
      />
    </div>
  );
}

const container = document.createElement("div");
document.body.appendChild(container);
render(<App />, container);
