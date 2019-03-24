import React from 'react';
import { compose } from 'recompose';

const isLoadingConditionFn = props => props.loading;
const nullConditionFn = props => props.data === null;
const isEmptyConditionFn = props => Object.keys(props.data).length === 0;

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
  

const ConditionalRenderingFn = compose(
  withEither(isLoadingConditionFn, LoadingIndicator),
  withMaybe(nullConditionFn, EmptyMessage),
  withEither(isEmptyConditionFn, EmptyMessage),
);

export default ConditionalRenderingFn