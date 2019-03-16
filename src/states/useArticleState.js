import { useState } from "react";

export default initialValue => {
  const [articles, setArticles] = useState({
    hits: [],
    nbHits: 0,  
  });

  return {
    articles,
    applySetResult: (result) => (prevState) => {
      const newArticles = {
        hits: result.hits,
        nbHits: result.nbHits,
        hitsPerPage: result.hitsPerPage
      }
      setArticles(newArticles);
    },
    applyUpdateResult: (result) => (prevState) => ({
      hits: [...prevState.hits, ...result.hits],
      currentPage: result.page,
    }),
    onClick: event => {

    },
    onMoveLeft: event => {

    },
    onMoveRight: event => {

    },
  };
};
