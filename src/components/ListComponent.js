import React from 'react';
import { compose } from 'recompose';

const isLoadingConditionFn = props => props.loading;
const nullConditionFn = props => props.articles === null;
const isEmptyConditionFn = props => Object.keys(props.articles).length === 0;

const EmptyMessage = () => (
  <div>
    <p className="empty-message">You have no Articles.</p>
  </div>
);

const LoadingIndicator = () => (
  <div>
    <p>Loading Articles ...</p>
  </div>
);

const withMaybe = conditionalRenderingFn => Component => props =>
  conditionalRenderingFn(props) ? null : <Component {...props} />;

const withEither = (conditionalRenderingFn, EitherComponent) => Component => props => {
  return conditionalRenderingFn(props) ? (<EitherComponent />) : (<Component {...props} />);
}
  

const withConditionalRenderings = compose(
  withEither(isLoadingConditionFn, LoadingIndicator),
  withMaybe(nullConditionFn, EmptyMessage),
  withEither(isEmptyConditionFn, EmptyMessage),
);

const ArticleList = ({ articles, loading }) => {
  return (
    <div>
      <div className="list">
        {articles.map(item => <div className="list-row" key={item.objectID}>
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

export default withConditionalRenderings(ArticleList)