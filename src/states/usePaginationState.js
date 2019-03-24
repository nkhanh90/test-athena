import { useState } from "react";

const LEFT_PAGE = "LEFT";
const RIGHT_PAGE = "RIGHT";

export default initialValue => {
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 0,
    pageLimit: 50,
    totalRecords: 0,
    pages: [],
    pageNeighbours: 5
  });

  return {
    pagination,
    fetchPageNumber: (totalRecords, currentPage, pageNeighbours, pageLimit) => {
      const totalPages = Math.ceil(totalRecords / pageLimit);
      const range = (from, to, step = 1) => {
        let i = from;
        const range = [];
      
        while (i <= to) {
          range.push(i);
          i += step;
        }
        return range;
      };
      
      const fetchPage = (totalPages, currentPage, pageNeighbours) => {
        const totalNumbers = pageNeighbours * 2 + 3;
        const totalBlocks = totalNumbers + 2;

        if (totalPages > totalBlocks) {
          let pages = [];
          const leftBound = currentPage - pageNeighbours;
          const rightBound = currentPage + pageNeighbours;
          const beforeLastPage = totalPages - 1;
    
          const startPage = leftBound > 2 ? leftBound : 2;
          const endPage = rightBound < beforeLastPage ? rightBound : beforeLastPage;
    
          pages = range(startPage, endPage);
          const pagesCount = pages.length;
          const singleSpillOffset = totalNumbers - pagesCount - 1;
    
          const leftSpill = startPage > 2;
          const rightSpill = endPage < beforeLastPage;
    
          const leftSpillPage = LEFT_PAGE;
          const rightSpillPage = RIGHT_PAGE;
    
          // console.log(`leftBound: ${leftBound}, rightBound: ${rightBound}, startPage: ${startPage}, endPage: ${endPage}, singleSpillOffset: ${singleSpillOffset}, pagesCount: ${pagesCount}`)
          if (leftSpill && !rightSpill) {
            const extraPages = range(startPage - singleSpillOffset, startPage - 1);
            pages = [leftSpillPage, ...extraPages, ...pages];
          } else if (!leftSpill && rightSpill) {
            const extraPages = range(endPage + 1, endPage + singleSpillOffset);
            pages = [...pages, ...extraPages, rightSpillPage];
          } else if (leftSpill && rightSpill) {
            pages = [leftSpillPage, ...pages, rightSpillPage];
          }
    
          return [1, ...pages, totalPages];
        }

      }
      
      const pages = fetchPage(totalPages, currentPage, pageNeighbours);

      const newPagination = {
        pages: pages,
        totalPages: totalPages,
        totalRecords: totalRecords,
        pageLimit: pageLimit,
        currentPage: currentPage,
        pageNeighbours: pageNeighbours
      }
      setPagination(newPagination)
    },
    gotoPage: (pageNumber) => {
      const currentPage = Math.max(0, Math.min(pageNumber, pagination.totalPages));
      setPagination({ ...pagination, currentPage})
    },
    // onPageChanged: data => {
    //   const { allCountries } = this.state;
    //   const { currentPage, totalPages, pageLimit } = data;
  
    //   const offset = (currentPage - 1) * pageLimit;
    //   const currentCountries = allCountries.slice(offset, offset + pageLimit);
      
    //   setPagination({ ...pagination, currentPage, totalPages, currentArticles})
    //   this.setState({ currentPage, currentCountries, totalPages });
    // }
  };
};
