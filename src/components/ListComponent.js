import React from 'react';
import ConditionalRenderingFn from './ConditionalRenderComponent';

const ArticleList = ({ data, loading }) => {
  console.log(data)
  return (
    <div>
      <div className="list">
        {data.hits.map(item => <div className="list-row" key={item.objectID}>
          <a href={item.url}>{item.title}</a>
        </div>)}
      </div>
      {/* <div className="interactions">
        {
          page !== null &&
          <button
            type="button"
            onClick={onPaginatedSearch}
          >
            More
          </button>
        }
        { nbHits !== null &&
          <Pagination
            totalRecords={nbHits}
            pageLimit={50}
            pageNeighbours={1}
            onPageChanged={onPaginatedSearch}
          />
        }
      </div> */}
    </div>
  );
}

export default ConditionalRenderingFn(ArticleList)