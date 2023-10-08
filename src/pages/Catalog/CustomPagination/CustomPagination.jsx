import { Pagination } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import './CustomPagination.scss';
const CustomPagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div>
      <Pagination className='d-flex justify-content-center'>
        <Pagination.First
          disabled={currentPage === 1}
          onClick={() => onPageChange(1)}
        />
        <Pagination.Prev
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {[...Array(totalPages)].map((_, i) => {
          return (
            <Pagination.Item
              key={uuidv4()}
              active={currentPage == i + 1}
              onClick={() => onPageChange(i + 1)}
            >
              {i + 1}
            </Pagination.Item>
          );
        })}
        <Pagination.Next
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
        <Pagination.Last
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(totalPages)}
        />
      </Pagination>
    </div>
  );
};

CustomPagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};
export default CustomPagination;
