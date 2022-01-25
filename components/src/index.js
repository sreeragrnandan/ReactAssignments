import React from "react";
import ReactDom from "react-dom";
import faker from "faker";
import CommentDetail from "./CommentDetails";

const App = () => {
  return (
    <div className="ui container comments">
      <CommentDetail
        author="Sam"
        timeAgo="Today at 4:45 PM"
        content="Nice Blog!"
        avatar={faker.image.image()}
      />
      <CommentDetail
        author="Alex"
        timeAgo="Today at 2:00 PM"
        content="Second Paragraph made me emotional"
        avatar={faker.image.image()}
      />
      <CommentDetail
        author="Jane"
        timeAgo="Yesterday at 5:00 PM"
        content="You are the best"
        avatar={faker.image.image()}
      />
    </div>
  );
};

ReactDom.render(<App />, document.querySelector("#root"));
