import PropTypes from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import './BtnsActionsCrud.scss';

const BtnsActionsCrud = ({ params }) => {
  const handleEdit = () => {
    console.log('Edit');
    console.log(params.row['@id']);
  };
  const handleDelete = () => {
    console.log('Delete');
    console.log(params.row['@id']);
  };
  return (
    <>
      <button
        className='btn btn-primary btn-actions-crud btn-edit'
        onClick={handleEdit}
      >
        <EditIcon className='icon-btn-actions' />
      </button>
      <button
        className='btn btn-danger btn-actions-crud btn-delete'
        onClick={handleDelete}
      >
        <DeleteIcon className='icon-btn-actions' />
      </button>
    </>
  );
};

BtnsActionsCrud.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.shape({
      '@id': PropTypes.string.isRequired,
      // others
    }).isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};
export default BtnsActionsCrud;
