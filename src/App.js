import React, { useEffect } from 'react';
import Pagination from "./components/PaginationComponent";

// import Pagination from "./Pagination";
import ArticleList from './components/ListComponent';

import useArticleState from './states/useArticleState';
import usePaginationState from './states/usePaginationState';
import useLoadingState from './states/useLoadingState';


const getHackerNewsUrl = (page) =>
  `https://hn.algolia.com/api/v1/search?page=${page}&hitsPerPage=50&query=redux`;

const App = (props) => {
  const { articles, applySetResult } = useArticleState([]);
  const { pagination, fetchPageNumber, gotoPage } = usePaginationState([]);
  const { loading, isLoading } = useLoadingState([]);

  useEffect(() => {
    
    const onSetResult = (result) => {
      applySetResult(result);
    }

    const onFetchPage = (result) => {
      fetchPageNumber(result.nbHits, pagination.currentPage, pagination.pageNeighbours, pagination.pageLimit);
    }

    const fetchStories = (page) => fetch(getHackerNewsUrl(page - 1)).then(response => {
        return response.json();
    })
    .then(result => {
      onSetResult(result);
      onFetchPage(result);
      isLoading(false);
    })

    fetchStories(pagination.currentPage);
  }, articles);

  const onClickPage = (page, event) => {
    gotoPage(page);
  }

  return (
    <div className="page">
      <div className="list">
        <ArticleList data={articles} loading={loading}/>
        <Pagination loading={loading} data={pagination} handleOnClickPage={onClickPage} />
      </div>
    </div>
  );
}

export default App;
