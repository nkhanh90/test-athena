import { useState } from "react";

export default initialValue => {
  const [articles, setArticles] = useState({
    hits: []
  });

  return {
    articles,
    applySetResult: (result) => {
      const newArticles = {
        hits: result.hits
      }
      setArticles(newArticles);
    },
    // applyUpdateResult: (result) => (prevState) => ({
    //   hits: [...prevState.hits, ...result.hits],
    //   currentPage: result.page,
    // }),
    // onClick: event => {

    // },
    // onMoveLeft: event => {

    // },
    // onMoveRight: event => {

    // },
  };
};
