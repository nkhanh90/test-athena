import React, { Component, Fragment } from "react";
import ConditionalRenderingFn from './ConditionalRenderComponent';

const LEFT_PAGE = "LEFT";
const RIGHT_PAGE = "RIGHT";

const Pagination = ({data, loading, handleOnClickPage}) => {
  console.log(data)
  return (
    <Fragment>
        <nav aria-label="Countries Pagination">
          <ul className="pagination">
            {data.pages.map((page, index) => {
              if (page === LEFT_PAGE)
                return (
                  <li key={index} className="page-item">
                    <a
                      className="page-link"
                      href="#"
                      aria-label="Previous"
                      // onClick={handleMoveLeft}
                    >
                      <span aria-hidden="true">&laquo;</span>
                      <span className="sr-only">Previous</span>
                    </a>
                  </li>
                );

              if (page === RIGHT_PAGE)
                return (
                  <li key={index} className="page-item">
                    <a
                      className="page-link"
                      href="#"
                      aria-label="Next"
                      // onClick={handleMoveRight}
                    >
                      <span aria-hidden="true">&raquo;</span>
                      <span className="sr-only">Next</span>
                    </a>
                  </li>
                );

              return (
                <li
                  key={index}
                  // className={`page-item${
                  //   currentPage === page ? " active" : ""
                  // }`}
                >
                  <a
                    className="page-link"
                    href="#"
                    onClick={e => { e.preventDefault(); handleOnClickPage(page, e)}}
                  >
                    {page}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </Fragment>
  );
}

export default ConditionalRenderingFn(Pagination);