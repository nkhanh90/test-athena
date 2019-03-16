import React, { useEffect } from 'react';
import Pagination from "./components/PaginationComponent";
import ArticleList from './components/ListComponent';

import useArticleState from './states/useArticleState';
import usePageState from './states/usePageState';
import useLoadingState from './states/useLoadingState';

const getHackerNewsUrl = (page) =>
  `https://hn.algolia.com/api/v1/search?page=${page}&hitsPerPage=50`;



const App = (props) => {
  const { articles, applySetResult } = useArticleState([]);
  const { page, setPage } = usePageState([]);
  const { loading, isLoading } = useLoadingState([]);

  useEffect(() => {
    isLoading(true);

    const onSetResult = (result) => {
      applySetResult(result)(articles);
      isLoading(false)
    }

    const fetchStories = (page) => fetch(getHackerNewsUrl(page - 1)).then(response => {
        return response.json();
    })
    .then(result => {
      onSetResult(result, page)
    });

    fetchStories(page.currentPage);
  }, articles);

  return (
    <div className="page">
      <div className="list">
        <ArticleList articles={articles.hits} loading={loading}/>
        <Pagination totalRecords={articles.nbHits} page={page}/>
      </div>
    </div>
  );
}

export default App;
