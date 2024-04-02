import { Col, Pagination } from "react-bootstrap";
import { IQueryParams } from "../../types/user.type";
import { Dispatch, SetStateAction } from "react";

interface IProps {
  setParams: Dispatch<SetStateAction<IQueryParams>>;
  params: IQueryParams;
  total: number;
  dataLength: number;
}

const TablePagination = (props: IProps) => {
  const { params, total, setParams, dataLength } = props;
  const totalPage = Math.ceil(total / params.limit);

  const goToFirst = () => {
    setParams({ ...params, page: 1 });
  };

  const goToLast = () => {
    setParams({ ...params, page: totalPage });
  };

  const goToPage = (page: number) => {
    setParams({ ...params, page });
  };

  const goToPrevious = () => {
    setParams({ ...params, page: params.page - 1 });
  };

  const goToNext = () => {
    setParams({ ...params, page: params.page + 1 });
  };

  const generatePagination = (
    currentPage: number,
    totalPages: number,
    displayPages: number
  ) => {
    const ellipsis = "...";
    const pagination = [];

    if (totalPages <= displayPages) {
      for (let i = 1; i <= totalPages; i++) {
        pagination.push(i);
      }
    } else {
      const halfDisplay = Math.floor(displayPages / 2);
      let startPage = Math.max(1, currentPage - halfDisplay);
      let endPage = Math.min(totalPages, currentPage + halfDisplay);

      if (currentPage - startPage < halfDisplay) {
        endPage = Math.min(totalPages, startPage + displayPages - 1);
      } else if (endPage - currentPage < halfDisplay) {
        startPage = Math.max(1, endPage - displayPages + 1);
      }

      if (startPage > 1) {
        pagination.push(1);
        if (startPage > 2) pagination.push(ellipsis);
      }

      for (let i = startPage; i <= endPage; i++) {
        pagination.push(i);
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) pagination.push(ellipsis);
        pagination.push(totalPages);
      }
    }

    return pagination;
  };

  return total ? (
    <>
      <Col sx={3}>{`${(params.page - 1) * params.limit + 1} - ${
        dataLength < params.limit
          ? total
          : (params.page - 1) * params.limit + params.limit
      }/${total}`}</Col>
      <Col sx={9}>
        <Pagination className="d-flex justify-content-end">
          <Pagination.First disabled={params.page === 1} onClick={goToFirst} />
          <Pagination.Prev
            disabled={params.page === 1}
            onClick={goToPrevious}
          />
          {generatePagination(params.page, totalPage, 4).map((page, index) => (
            <Pagination.Item
              key={index}
              onClick={() => {
                goToPage(index + 1);
              }}
              active={index + 1 === params.page}
              disabled={page === "..."}
            >
              {page}
            </Pagination.Item>
          ))}
          <Pagination.Next
            disabled={params.page === totalPage}
            onClick={goToNext}
          />
          <Pagination.Last
            disabled={params.page === totalPage}
            onClick={goToLast}
          />
        </Pagination>
      </Col>
    </>
  ) : null;
};

export default TablePagination;
