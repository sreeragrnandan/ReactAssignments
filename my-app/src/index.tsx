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
          "bs.TotalCurrentRatio": "bs.123",
          "pnl.NetAsset": "pnl.321",
          "bs.IntangibleAssests": "bs.231",
          "pnl.Inventory": "pnl.231",
          "bs.TotalCurrentLiability": "bs.789",
          "pnl.NetPayment": "pnl.456",
          "bs.InvoiceDate": "bs.147",
          "pnl.Solitary": "pnl.963",
        }}
      />
    </div>
  );
}

const container = document.createElement("div");
document.body.appendChild(container);
render(<App />, container);
