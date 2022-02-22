import React, { Fragment } from "react";
import Link from "next/link";

const NewsPage = () => {
  return (
    <Fragment>
      <h1>News page</h1>
      <ul>
        <li>
          <Link href="news/News_1">News 1</Link>
        </li>
        <li>
          <Link href="news/News_2">News 2</Link>
        </li>
      </ul>
    </Fragment>
  );
};

export default NewsPage;
