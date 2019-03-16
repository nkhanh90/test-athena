import { useState } from "react";

export default initialValue => {
  const [page, setPage] = useState({
    currentPage: 1,
    pageLimit: 50,
    pageNeighbours: 1
  });

  return {
    page,
    onClick: event => {

    },
    onMoveLeft: event => {

    },
    onMoveRight: event => {

    },
  };
};
